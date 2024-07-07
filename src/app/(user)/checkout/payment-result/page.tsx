import { stripe } from '@/lib/stripe';
import Link from 'next/link';

type TPaymentResult = {
  searchParams: { payment_intent: string };
};

export default async function PaymentResult({ searchParams }: TPaymentResult) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  const isSuccessful = paymentIntent.status === 'succeeded';

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32 text-center'>
      {isSuccessful ? (
        <>
          <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Płatność zakończona pomyślnie ✅
          </h1>
          <p className='text-gray-700 text-lg mb-8'>
            Dziękujemy za złożenie zamówienia w naszym sklepie.
          </p>
        </>
      ) : (
        <>
          <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Płatność nieudana ❌
          </h1>
          <p className='text-gray-700 text-lg mb-8'>
            Coś poszło nie tak podczas realizacji płatności.
          </p>
        </>
      )}
      <Link
        className='bg-green-700 inline-block shadow-lg shadow-green-700/50 text-white text-lg font-medium py-3 px-12 rounded-lg hover:bg-green-800 transition-all duration-300'
        href='/'
      >
        Strona główna
      </Link>
    </section>
  );
}
