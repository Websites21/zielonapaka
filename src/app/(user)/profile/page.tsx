import { logoutAction } from '@/actions/user-actions';
import LogoutButton from '@/components/buttons/logout-button';
import { getOrdersByUserID, getUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const user = await getUser();

  if (!user) redirect('/login');

  const orders = await getOrdersByUserID(user.id);

  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-8 my-16 lg:my-32'>
      <h1 className='text-4xl font-medium tracking-tight text-gray-950 mb-8'>
        Witaj, <span className='text-green-700'>{user.username}</span> 👋
      </h1>
      <p className='text-gray-700 text-lg mb-8'>
        Cieszy się, że tutaj jesteś i chcesz inwestować w swoje zdrowie!
      </p>
      <div className='mb-8 space-y-4'>
        {orders.map((order) => (
          <div
            className='flex justify-between rounded-lg border border-gray-200 shadow-lg shadow-gray-200/50 p-4'
            key={order.id}
          >
            <p className='text-base font-medium text-gray-950'>
              ID zamówienia: {order.id}
            </p>
            <p className='text-base text-gray-700'>Suma: {order.amount} zł</p>
          </div>
        ))}
      </div>
      <form action={logoutAction}>
        <LogoutButton />
      </form>
    </section>
  );
}
