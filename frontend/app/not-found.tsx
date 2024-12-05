import NotFoundBlock from '@/components/common/not-found-block';
import { getServerAuth } from '@/lib/auth-handler';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  const { user } = await getServerAuth();

  if (user) {
    redirect('/not-found');
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <NotFoundBlock backLink='/' />
    </div>
  );
}
