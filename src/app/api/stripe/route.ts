import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  createOrder,
  deleteCartItemsByUserID,
  getUserByEmail,
} from '@/lib/server-utils';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const text = await req.text();
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(text, sig, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: 'Webhook error',
    });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const receiptEmail = event.data.object.receipt_email;
      const amount = event.data.object.amount_received / 100;

      if (!receiptEmail) {
        return NextResponse.json({
          status: 400,
          message: 'No email provided in payment intent',
        });
      }

      const user = await getUserByEmail(receiptEmail);

      if (!user) {
        return NextResponse.json({
          status: 400,
          message: 'No user found with provided email',
        });
      }

      await createOrder(user.id, amount);
      await deleteCartItemsByUserID(user.id);

      break;
    default:
      console.log(`Unhandled event type:${event.type}`);
  }

  return NextResponse.json({ status: 200 });
}
