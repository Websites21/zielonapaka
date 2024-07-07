import 'server-only';
import prisma from './prisma';
import { type TUser, type TProduct } from './types';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function getProductByName(productName: string) {
  return await prisma.product.findUnique({
    where: { name: productName },
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

export async function getProductByID(productID: string) {
  return await prisma.product.findUnique({
    where: { id: productID },
  });
}

export async function getUserByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: { email: userEmail },
  });
}

export async function createUser({
  username,
  email,
  passwordHash,
}: Omit<TUser, 'id'>) {
  return await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
    },
  });
}

export async function createSession(userID: string) {
  const session = await prisma.session.create({
    data: {
      userID,
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  });

  cookies().set('session_token', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  });
}

export async function verifySession() {
  const token = cookies().get('session_token')?.value;

  if (!token) return null;

  try {
    const session = await getSessionByID(token);

    if (!session) return null;

    const isSessionActive = session.expiresAt > new Date();

    if (!isSessionActive) return null;

    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSessionByID(sessionID: string) {
  return await prisma.session.findUnique({
    where: { id: sessionID },
  });
}

export async function getUser() {
  const session = await verifySession();

  if (!session) return null;

  return await prisma.user.findUnique({
    where: { id: session.userID },
  });
}

export async function createCart(userID: string) {
  await prisma.cart.create({
    data: { userID },
  });
}

export async function getCartByUserID(userID: string) {
  return await prisma.cart.findUnique({
    where: { userID },
  });
}

export async function createOrUpdateCartItem(
  cartID: string,
  productID: string,
  quantity: number
) {
  await prisma.cartItem.upsert({
    where: { cartID_productID: { cartID, productID } },
    create: { cartID, productID, quantity },
    update: { quantity },
  });
}

export async function getCartItems() {
  const user = await getUser();

  if (!user) return null;

  return await prisma.cartItem.findMany({
    where: { cart: { userID: user.id } },
  });
}

export async function getCartItemsWithProductDetailsByCartID(cartID: string) {
  return await prisma.cartItem.findMany({
    where: { cartID },
    include: { product: true },
  });
}

export async function deleteCartItemByID(cartItemID: string) {
  await prisma.cartItem.delete({
    where: { id: cartItemID },
  });
}

export async function deleteProductByID(productID: string) {
  await prisma.product.delete({
    where: { id: productID },
  });
}
