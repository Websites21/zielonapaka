import { getCartItems } from '@/lib/server-utils';
import Link from 'next/link';

export default async function Nav() {
  const cartItemsLength = (await getCartItems())?.length;

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-b-gray-200'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-8 h-24 flex justify-between items-center'>
        <Link href='/'>
          <img className='w-52' src='/logo.svg' alt='Logo ZielonaPaka' />
        </Link>
        <ul className='flex gap-2'>
          <li>
            <Link
              className='block group p-2 rounded-lg hover:bg-green-100 transition-all duration-300 relative'
              href='/cart'
            >
              <svg
                className='size-6 stroke-gray-950 group-hover:stroke-green-700 transition-all duration-300'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64M5.52 2.64C5.696 2.40533 5.784 2.288 5.89552 2.20338C5.9943 2.12842 6.10616 2.0725 6.22539 2.03845C6.36 2 6.50667 2 6.8 2H17.2C17.4933 2 17.64 2 17.7746 2.03845C17.8938 2.0725 18.0057 2.12842 18.1045 2.20338C18.216 2.288 18.304 2.40533 18.48 2.64M5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {cartItemsLength && cartItemsLength > 0 ? (
                <span className='absolute top-0 right-0 text-xs text-white flex justify-center items-center size-6 rounded-full bg-red-600 translate-x-1/4 -translate-y-1/4'>
                  {cartItemsLength}
                </span>
              ) : null}
            </Link>
          </li>
          <li>
            <Link
              className='block group p-2 rounded-lg hover:bg-green-100 transition-all duration-300 relative'
              href='/login'
            >
              <svg
                className='size-6 stroke-gray-950 group-hover:stroke-green-700 transition-all duration-300'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
