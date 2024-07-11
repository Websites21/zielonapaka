import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32 text-center'>
      <h1 className='text-5xl lg:text-7xl font-bold tracking-tight text-gray-950 mb-8'>
        Nie znaleziono <span className='text-green-700'>404</span>
      </h1>
      <p className='text-gray-700 text-lg mb-8'>
        Strona, której szukasz nie istnieje lub została przeniesiona.
      </p>
      <Link
        className='bg-green-700 inline-block shadow-lg shadow-green-700/50 text-white font-medium text-lg py-3 px-12 rounded-lg hover:bg-green-800 transition-all duration-300'
        href='/'
      >
        Strona główna
      </Link>
    </section>
  );
}
