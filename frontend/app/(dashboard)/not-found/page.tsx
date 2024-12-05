import NotFoundBlock from '@/components/common/not-found-block';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  return (
    <div className='min-h-full flex items-center justify-center'>
      <NotFoundBlock backLink='/dashboard' />
    </div>
  );
}
