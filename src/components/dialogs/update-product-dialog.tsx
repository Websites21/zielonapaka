'use client';

import { updateProductAction } from '@/actions/admin-actions';
import { type TProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { forwardRef, useEffect } from 'react';
import { useFormState } from 'react-dom';

type TUpdateProductDialog = {
  handleClose: () => void;
  product: TProduct | null;
};

const UpdateProductDialog = forwardRef<HTMLDialogElement, TUpdateProductDialog>(
  function DeleteProductDialog({ handleClose, product }, ref) {
    const [state, action] = useFormState(updateProductAction, {
      errors: {},
      message: '',
    });

    useEffect(() => {
      if (state.message === 'Produkt zaktualizowano pomyślnie.') {
        state.message = '';
        handleClose();
      }
    }, [state, handleClose]);

    return (
      <dialog
        className='bg-white w-full max-w-xl p-8 border border-gray-200 rounded-lg backdrop:backdrop-brightness-50 backdrop:backdrop-blur-sm'
        ref={ref}
      >
        <form action={action}>
          <div className='flex justify-between items-center mb-4'>
            <p className='text-lg font-medium text-gray-950'>
              Aktualizuj produkt
            </p>
            <button
              className='p-2 rounded-lg hover:bg-gray-100 transition-all duration-300'
              type='button'
              onClick={handleClose}
            >
              <svg
                className='size-6 stroke-gray-950'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18 6L6 18M6 6L18 18'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <div>
            <input name='id' type='hidden' id='id' defaultValue={product?.id} />
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <label
              className='text-gray-950 font font-medium text-sm'
              htmlFor='name'
            >
              Nazwa
            </label>
            <input
              className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
              type='text'
              name='name'
              id='name'
              placeholder='Nazwa'
              defaultValue={product?.name}
              required
            />
            {state.errors.name?.map((error: string) => (
              <p className='text-red-700 text-sm mt-2' key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <label
              className='text-gray-950 font font-medium text-sm'
              htmlFor='price'
            >
              Cena
            </label>
            <input
              className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
              type='number'
              name='price'
              id='price'
              placeholder='0'
              defaultValue={product?.price}
              required
            />
            {state.errors.price?.map((error: string) => (
              <p className='text-red-700 text-sm mt-2' key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className='flex flex-col gap-1 mb-4'>
            <label
              className='text-gray-950 font font-medium text-sm'
              htmlFor='description'
            >
              Opis
            </label>
            <textarea
              className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
              name='description'
              id='description'
              placeholder='Opis'
              defaultValue={product?.description}
              required
            />
            {state.errors.description?.map((error: string) => (
              <p className='text-red-700 text-sm mt-2' key={error}>
                {error}
              </p>
            ))}
          </div>
          <div className='flex flex-col gap-1 mb-8'>
            <label
              className='text-gray-950 font font-medium text-sm'
              htmlFor='imageURL'
            >
              Link do zdjęcia
            </label>
            <input
              className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
              type='text'
              name='imageURL'
              id='imageURL'
              placeholder='https://unsplash.com/...'
              defaultValue={product?.imageURL}
              required
            />
            {state.errors.imageURL?.map((error: string) => (
              <p className='text-red-700 text-sm mt-2' key={error}>
                {error}
              </p>
            ))}
            <p
              className={cn(
                'text-red-700 text-sm mt-2',
                state.message === 'Produkt dodano pomyślnie.' &&
                  'text-green-700'
              )}
            >
              {state.message}
            </p>
          </div>
          <div className='flex justify-between gap-4'>
            <button
              className='text-gray-950 font-medium text-base py-2 px-12 rounded-lg border border-gray-400 hover:bg-gray-100 transition-all duration-300'
              type='button'
              onClick={handleClose}
            >
              Anuluj
            </button>
            <button
              className='text-white font-medium text-base py-2 px-12 rounded-lg shadow-lg shadow-green-700/50 bg-green-700 hover:bg-green-800 transition-all duration-300'
              type='submit'
            >
              Aktualizuj
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default UpdateProductDialog;
