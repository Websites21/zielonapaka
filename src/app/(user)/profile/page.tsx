import LogoutButton from '@/components/buttons/logout-button';
import { getUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
        Witaj, <span className='text-green-700'>{user.username}</span> 👋
      </h1>
      <p className='text-gray-700 text-lg mb-8'>
        Cieszy się, że tutaj jesteś i chcesz inwestować w swoje zdrowie!
      </p>
      <LogoutButton />
    </section>
  );
}
