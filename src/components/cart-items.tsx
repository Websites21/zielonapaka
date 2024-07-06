import Link from 'next/link';

export default function CartItems() {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <div className='grid lg:grid-cols-2 gap-16'>
        <div>
          <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Koszyk
          </h1>
          <div className='space-y-4'></div>
        </div>
        <div>
          <p className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Podsumowanie
          </p>
          <p className='text-lg text-gray-950 border-y border-y-gray-20 py-4 mb-8'>
            Suma: 140 zł
          </p>
          <Link
            href='/checkout'
            className='bg-green-700 inline-block shadow-lg shadow-green-700/50 text-white font-medium text-lg py-3 px-12 rounded-lg hover:bg-green-800 transition-all duration-300'
          >
            Przejdź do kasy
          </Link>
        </div>
      </div>
    </section>
  );
}
