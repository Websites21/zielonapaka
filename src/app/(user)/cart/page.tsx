import CartItems from '@/components/cart-items';
import { getUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const user = await getUser();
  if (!user) redirect('/login');

  return <CartItems />;
}
