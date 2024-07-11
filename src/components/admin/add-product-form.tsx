'use client';

import { useFormState } from 'react-dom';
import AddProductButton from '../buttons/add-product-button';
import { addProductAction } from '@/actions/admin-actions';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function AddProductForm() {
  const [state, action] = useFormState(addProductAction, {
    errors: {},
    message: '',
  });

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Produkt dodano pomyślnie.') {
      ref.current?.reset();
    }
  }, [state]);

  return (
    <form
      className='rounded-lg mx-auto border border-gray-200 p-8 shadow-lg shadow-gray-200/50'
      action={action}
      ref={ref}
    >
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
          type='url'
          name='imageURL'
          id='imageURL'
          placeholder='https://unsplash.com/...'
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
            state.message === 'Produkt dodano pomyślnie.' && 'text-green-700'
          )}
        >
          {state.message}
        </p>
      </div>
      <AddProductButton />
    </form>
  );
}
