import 'server-only';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export async function createPaymentIntent(totalPrice: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: 'pln',
  });

  return paymentIntent.client_secret;
}
