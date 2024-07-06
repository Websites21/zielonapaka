import SignupForm from '@/components/auth/signup-form';
import { verifySession } from '@/lib/server-utils';
import { redirect } from 'next/navigation';

export default async function Signup() {
  const session = await verifySession();

  if (session) redirect('/profile');

  return <SignupForm />;
}
