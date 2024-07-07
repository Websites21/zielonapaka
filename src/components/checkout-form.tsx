'use client';

import { TCheckoutForm, TPaymentInputs } from '@/lib/types';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutForm({
  clientSecret,
  totalPrice,
  email,
}: TCheckoutForm) {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8 text-center'>
        Płatność 🧾
      </h1>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          loader: 'always',
          appearance: { theme: 'flat' },
        }}
      >
        <PaymentInputs totalPrice={totalPrice} email={email} />
      </Elements>
    </section>
  );
}

function PaymentInputs({ totalPrice, email }: TPaymentInputs) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/checkout/payment-result`,
        receipt_email: email,
      },
    });

    setIsLoading(false);

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('Wystąpił niespodziewany błąd. Spróbuj ponownie.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-xl mx-auto space-y-8'>
      <PaymentElement />
      {message && <p className='text-red-700 text-sm'>{message}</p>}
      <button
        className='bg-green-700 shadow-lg shadow-green-700/50 text-white font-medium text-lg py-3 w-full rounded-lg hover:bg-green-800 transition-all duration-300 disabled:bg-green-700/50'
        type='submit'
        disabled={!stripe || !elements || isLoading}
      >
        Dokonaj zapłaty {totalPrice} zł
      </button>
    </form>
  );
}
