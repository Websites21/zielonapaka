'use server';

import {
  createCart,
  createOrUpdateCartItem,
  createSession,
  createUser,
  getCartByUserID,
  getUserByEmail,
  verifySession,
} from '@/lib/server-utils';
import { LoginSchema, SignupSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signupAction(_: any, formData: unknown) {
  if (formData instanceof FormData) {
    const signupData = Object.fromEntries(formData);
    const validationResult = SignupSchema.safeParse(signupData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return { errors, message: '' };
    }

    const { username, email, password } = validationResult.data;

    try {
      const user = await getUserByEmail(email);

      if (user) {
        const message = 'Konto o podanym adresie email już istnieje.';
        return { errors: {}, message };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await createUser({ username, email, passwordHash });
      await createSession(newUser.id);
      await createCart(newUser.id);
    } catch (error) {
      console.log(error);
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }
  } else {
    const message = 'Coś poszło nie tak. Spróbuj ponownie.';
    return { errors: {}, message };
  }

  redirect('/');
}

export async function loginAction(_: any, formData: unknown) {
  if (formData instanceof FormData) {
    const loginData = Object.fromEntries(formData);
    const validationResult = LoginSchema.safeParse(loginData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return { errors, message: '' };
    }

    const { email, password } = validationResult.data;

    try {
      const user = await getUserByEmail(email);

      if (!user) {
        const message = 'Niepoprawne dane logowania.';
        return { errors: {}, message };
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.passwordHash
      );

      if (!isPasswordCorrect) {
        const message = 'Niepoprawne dane logowania.';
        return { errors: {}, message };
      }

      await createSession(user.id);
    } catch (error) {
      console.log(error);
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }
  } else {
    const message = 'Coś poszło nie tak. Spróbuj ponownie.';
    return { errors: {}, message };
  }

  redirect('/');
}

export async function logoutAction() {
  cookies().delete('session_token');
  redirect('/login');
}

export async function createOrUpdateCartItemAction(
  productID: string,
  quantity: number
) {
  const session = await verifySession();

  if (!session) redirect('/login');

  const cart = await getCartByUserID(session.userID);

  if (!cart) return null;

  await createOrUpdateCartItem(cart.id, productID, quantity);

  revalidatePath('/');
}
