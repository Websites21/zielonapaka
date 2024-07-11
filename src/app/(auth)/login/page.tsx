import LoginForm from '@/components/auth/login-form';
import { verifySession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await verifySession();

  if (session) redirect('/profile');

  return <LoginForm />;
}
