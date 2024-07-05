'use server';

import { ProductSchema } from '@/lib/validations';
import { createProduct, getProductByName } from '@/lib/server-utils';
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
      const message = 'Coś poszło nie tak. Spróbuj ponownie.';
      return { errors: {}, message };
    }
  } else {
    const message = 'Coś poszło nie tak. Spróbuj ponownie.';
    return { errors: {}, message };
  }
}
