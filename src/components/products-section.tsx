'use client';

import { type TProduct } from '@/lib/types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductsSection({
  products,
}: {
  products: TProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sort') || 'default';

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'default') router.push('/', { scroll: false });
    else router.push(`?sort=${e.target.value}`, { scroll: false });
  }

  function sortProducts(products: TProduct[], sortBy: string) {
    switch (sortBy) {
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  }

  const sortedProducts = sortProducts(products, sortBy);

  return (
    <section
      className='max-w-screen-2xl mx-auto px-4 sm:px-8 mb-16 lg:mb-32'
      id='products'
    >
      <h2 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
        Świeżo, tanio i ekologicznie 😊
      </h2>
      <div className='flex flex-col lg:flex-row justify-between lg:items-center mb-8 gap-4'>
        <p className='text-gray-700 text-base'>
          Liczba produktów: {sortedProducts.length}
        </p>
        <div>
          <label
            className='text-gray-950 font-medium text-sm mr-4'
            htmlFor='sort'
          >
            Sortuj wg
          </label>
          <select
            className='text-gray-700 text-base border border-gray-200 p-1 rounded-lg shadow-lg shadow-gray-200/50'
            name='sort'
            id='sort'
            value={sortBy}
            onChange={handleSelectChange}
          >
            <option value='default'>Domyślnie</option>
            <option value='priceDesc'>Cena: od najwyższej</option>
            <option value='priceAsc'>Cena: od najniższej</option>
          </select>
        </div>
      </div>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {sortedProducts.map((product) => (
          <Link
            className='rounded-lg overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300'
            href={`/products/${product.id}`}
            key={product.id}
          >
            <figure>
              <img
                className='w-full h-60 object-cover'
                src={product.imageURL}
                alt={product.name}
              />
              <div className='p-4'>
                <div className='flex justify-between items-center'>
                  <p className='text-lg font-medium text-gray-950'>
                    {product.name}
                  </p>
                  <svg
                    className='size-6 stroke-gray-950'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <p className='text-lg text-gray-700'>{product.price} zł/kg</p>
              </div>
            </figure>
          </Link>
        ))}
      </div>
    </section>
  );
}
