'use client';

import { deleteCartItemAction } from '@/actions/user-actions';
import { TCartItemWithProductDetails } from '@/lib/types';
import Link from 'next/link';

export default function CartItems({
  cartItems,
  totalPrice,
}: {
  cartItems: TCartItemWithProductDetails[];
  totalPrice: number;
}) {
  async function handleDeleteCartItem(cartItemID: string) {
    await deleteCartItemAction(cartItemID);
  }

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <div className='grid lg:grid-cols-2 gap-16'>
        <div>
          <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Koszyk
          </h1>
          <div className='space-y-4'>
            {cartItems.map((item) => (
              <figure
                className='flex rounded-lg overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/50'
                key={item.id}
              >
                <Link href={`/products/${item.product.id}`}>
                  <img
                    className='h-28 w-40 object-cover'
                    src={item.product.imageURL}
                    alt={item.product.name}
                  />
                </Link>
                <div className='flex flex-col justify-center p-4'>
                  <p className='text-lg font-medium text-gray-950'>
                    {item.product.name}
                  </p>
                  <p className='text-lg text-gray-700'>
                    {item.product.price} zł/kg
                  </p>
                </div>
                <div className='flex flex-col justify-between p-4 ml-auto'>
                  <p className='text-base text-gray-700'>
                    Ilość: {item.quantity} kg
                  </p>
                  <button
                    className='ml-auto group transition-all duration-300'
                    type='button'
                    onClick={() => handleDeleteCartItem(item.id)}
                  >
                    <svg
                      className='size-6 stroke-gray-700 group-hover:stroke-red-700 transition-all duration-300'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <div>
          <p className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
            Podsumowanie
          </p>
          <p className='text-lg text-gray-950 border-y border-y-gray-20 py-4 mb-8'>
            Suma: {totalPrice} zł
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
