'use server';

import { ProductSchema } from '@/lib/validations';
import {
  createProduct,
  deleteProductByID,
  getProductByID,
  getProductByName,
  updateProduct,
} from '@/lib/server-utils';
import { revalidatePath } from 'next/cache';

export async function addProductAction(_: any, formData: unknown) {
  if (formData instanceof FormData) {
    const productData = Object.fromEntries(formData);
    const validationResult = ProductSchema.safeParse(productData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return { errors, message: '' };
    }

    const { name, price, description, imageURL } = validationResult.data;

    try {
      const product = await getProductByName(name);

      if (product) {
        const message = 'Dany produkt już istnieje.';
        return { errors: {}, message };
      }

      await createProduct({ name, price, description, imageURL });

      revalidatePath('/');

      const message = 'Produkt dodano pomyślnie.';
      return { errors: {}, message };
    } catch (error) {
      console.log(error);
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }
  } else {
    const message = 'Coś poszło nie tak. Spróbuj ponownie.';
    return { errors: {}, message };
  }
}

export async function deleteProductAction(productID: string) {
  await deleteProductByID(productID);
  revalidatePath('/');
}

export async function updateProductAction(_: any, formData: unknown) {
  if (formData instanceof FormData) {
    const productData = Object.fromEntries(formData);
    const validationResult = ProductSchema.safeParse(productData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return { errors, message: '' };
    }

    const { id, name, price, description, imageURL } = validationResult.data;

    if (!id) {
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }

    try {
      const product = await getProductByID(id);

      if (!product) {
        const message = 'Coś poszło nie tak. Spróbuj ponownie.';
        return { errors: {}, message };
      }

      await updateProduct({ id, name, price, description, imageURL });

      revalidatePath('/');

      const message = 'Produkt zaktualizowano pomyślnie.';
      return { errors: {}, message };
    } catch (error) {
      console.log(error);
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }
  } else {
    const message = 'Coś poszło nie tak. Spróbuj ponownie.';
    return { errors: {}, message };
  }
}
