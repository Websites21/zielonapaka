'use client';

import Link from 'next/link';
import SignupButton from '../buttons/signup-button';
import { useFormState } from 'react-dom';
import { signupAction } from '@/actions/user-actions';

export default function SignupForm() {
  const [state, action] = useFormState(signupAction, {
    errors: {},
    message: '',
  });

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <form
        className='max-w-lg mx-auto border border-gray-200 p-8 rounded-lg shadow-lg shadow-gray-200/50'
        action={action}
      >
        <div className='mb-4 bg-green-200 p-3 w-max mx-auto rounded-full'>
          <img className='size-12' src='/ikona.svg' alt='Ikona ZielonaPaka' />
        </div>
        <h1 className='text-3xl font-medium text-gray-950 mb-8 text-center'>
          Rejestracja 🔐
        </h1>
        <div className='flex flex-col gap-1 mb-4'>
          <label
            className='text-gray-950 font font-medium text-sm'
            htmlFor='username'
          >
            Nazwa użytkownika
          </label>
          <input
            className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
            type='text'
            name='username'
            id='username'
            placeholder='John Galt'
            required
          />
          {state.errors.username?.map((error: string) => (
            <p className='text-red-700 text-sm mt-2' key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className='flex flex-col gap-1 mb-4'>
          <label
            className='text-gray-950 font font-medium text-sm'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
            type='email'
            name='email'
            id='email'
            placeholder='adres@gmail.com'
            required
          />
          {state.errors.email?.map((error: string) => (
            <p className='text-red-700 text-sm mt-2' key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className='flex flex-col gap-1 mb-8'>
          <label
            className='text-gray-950 font font-medium text-sm'
            htmlFor='password'
          >
            Hasło
          </label>
          <input
            className='text-base border border-gray-200 py-2 px-4 rounded-lg text-gray-950 placeholder:text-gray-500 shadow-lg shadow-gray-200/50'
            type='password'
            name='password'
            id='password'
            placeholder='Hasło'
            required
          />
          {state.errors.password?.map((error: string) => (
            <p className='text-red-700 text-sm mt-2' key={error}>
              {error}
            </p>
          ))}
          {state.message && (
            <p className='text-red-700 text-sm mt-2'>{state.message}</p>
          )}
        </div>
        <SignupButton />
        <p className='text-sm text-center text-gray-700'>
          Masz już konto?{' '}
          <Link className='text-green-700 underline' href='/login'>
            Zaloguj się
          </Link>
        </p>
      </form>
    </section>
  );
}
