'use client';

import { TProduct } from '@/lib/types';
import { useState } from 'react';

export default function ProductInfo({ product }: { product: TProduct }) {
  const [quantity, setQuantity] = useState(1);

  function handlePlusClick() {
    setQuantity((prev) => prev + 1);
  }

  function handleMinusClick() {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  }

  async function handleCreateOrUpdateCartItem() {
    await createOrUpdateCartItemAction(product.id, quantity);
  }

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <div className='grid lg:grid-cols-2 gap-16'>
        <img
          className='rounded-lg max-h-96 w-full object-cover'
          src={product.imageURL}
          alt={product.name}
        />
        <div className='border border-gray-200 shadow-lg shadow-gray-200/50 rounded-lg p-8'>
          <h1 className='text-gray-950 font-medium text-3xl mb-4'>
            {product.name}
          </h1>
          <p className='text-lg text-gray-700 mb-8'>{product.description}</p>
          <p className='text-lg text-gray-700 mb-4'>{product.price} zł/kg</p>
          <div className='flex items-center gap-4 mb-8'>
            <button
              className='p-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition-all duration-300'
              type='button'
              onClick={handleMinusClick}
            >
              <svg
                className='size-5 stroke-gray-950'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 12H19'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <span className='text-lg text-gray-950'>{quantity} kg</span>
            <button
              className='p-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition-all duration-300'
              type='button'
              onClick={handlePlusClick}
            >
              <svg
                className='size-5 stroke-gray-950'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 5V19M5 12H19'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <button
            className='w-full text-center bg-green-700 shadow-lg shadow-green-700/50 text-white font-medium text-lg py-3 rounded-lg hover:bg-green-800 transition-all duration-300'
            type='button'
            onClick={handleCreateOrUpdateCartItem}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </section>
  );
}
