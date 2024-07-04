import Link from 'next/link';
import ProductsSection from '@/components/products-section';

export default function Home() {
  return (
    <main>
      <section className='bg-[url(/hero-1.png)] bg-cover bg-center py-16 lg:py-32 mb-16 lg:mb-32 text-center lg:text-left'>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-8'>
          <h1 className='text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8'>
            Zamów u nas ekologiczne warzywa 🥦
          </h1>
          <p className='text-lg text-gray-200 mb-8'>
            Skorzystaj z naszej oferty już dziś i zacznij odżywiać się zdrowo
            razem z całą rodziną.
          </p>
          <Link
            className='bg-green-700 inline-block shadow-lg shadow-green-700/50 text-white font-medium text-lg py-3 px-12 rounded-lg hover:bg-green-800 transition-all duration-300'
            href='#products'
          >
            Sprawdź ofertę
          </Link>
        </div>
      </section>
      <ProductsSection />
    </main>
  );
}
