'use client';

import { useFormStatus } from 'react-dom';

export default function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-green-700 shadow-lg shadow-green-700/50 text-white mb-8 font-medium text-lg py-3 w-full rounded-lg hover:bg-green-800 transition-all duration-300 disabled:bg-green-700/50'
      type='submit'
      disabled={pending}
    >
      Zaloguj się
    </button>
  );
}
