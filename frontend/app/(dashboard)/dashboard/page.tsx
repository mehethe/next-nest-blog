import { getServerAuth } from '@/lib/auth-handler';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const { user } = await getServerAuth();

  return (
    <>
      <h2 className='text-2xl font-bold'>
        Hello, <span className='capitalize text-primary'>{user?.name}</span>
      </h2>
      <p className='text-muted-foreground text-sm mt-1'>
        Navigate to the Blogs tab to manage your blogs
      </p>
    </>
  );
}
