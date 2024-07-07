import CheckoutForm from '@/components/checkout-form';
import {
  getCartByUserID,
  getCartItemsWithProductDetailsByCartID,
  getUser,
} from '@/lib/server-utils';
import { createPaymentIntent } from '@/lib/stripe';
import { calculateOrderAmount } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function Checkout() {
  const user = await getUser();
  if (!user) redirect('/login');

  const cart = await getCartByUserID(user.id);
  if (!cart) return null;

  const cartItems = await getCartItemsWithProductDetailsByCartID(cart.id);
  const totalPrice = calculateOrderAmount(cartItems);

  const clientSecret = await createPaymentIntent(totalPrice);
  if (!clientSecret) return null;

  const { email } = user;

  return (
    <CheckoutForm
      clientSecret={clientSecret}
      totalPrice={totalPrice}
      email={email}
    />
  );
}
