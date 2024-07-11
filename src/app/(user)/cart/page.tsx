import CartItems from '@/components/cart-items';
import {
  getCartByUserID,
  getCartItemsWithProductDetailsByCartID,
  getUser,
} from '@/lib/server-utils';
import { calculateOrderAmount } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const user = await getUser();
  if (!user) redirect('/login');

  const cart = await getCartByUserID(user.id);
  if (!cart) return null;

  const cartItems = await getCartItemsWithProductDetailsByCartID(cart.id);
  const totalPrice = calculateOrderAmount(cartItems);

  return <CartItems cartItems={cartItems} totalPrice={totalPrice} />;
}
