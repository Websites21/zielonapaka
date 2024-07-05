import 'server-only';
import prisma from './prisma';
import { type TProduct } from './types';

export async function getProductByName(name: string) {
  return await prisma.product.findUnique({
    where: { name },
  });
}

export async function createProduct({
  name,
  price,
  description,
  imageURL,
}: Omit<TProduct, 'id'>) {
  await prisma.product.create({
    data: {
      name,
      price,
      description,
      imageURL,
    },
  });
}
