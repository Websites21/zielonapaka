import 'server-only';
import prisma from './prisma';
import { type TProduct } from './types';
import { NextRequest } from 'next/server';

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

export async function getProducts() {
  return await prisma.product.findMany();
}

export function checkAuthorization(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');

  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}
