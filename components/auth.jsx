// app/protected/AuthGuard.js (server component)
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';

export default async function AuthGuard({ children }) {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (user?.role === 'ADMIN') {
    redirect('/admin');
  }

  return <>{children}</>;
}