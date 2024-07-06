'use client';

import { useFormStatus } from 'react-dom';

export default function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className='text-gray-950 border border-gray-400 mb-8 font-medium text-base py-3 px-12 rounded-lg hover:bg-gray-100 transition-all duration-300'
      type='submit'
      disabled={pending}
    >
      Wyloguj się
    </button>
  );
}
