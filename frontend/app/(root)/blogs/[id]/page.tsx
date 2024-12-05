import BlogDetails from '@/components/blog/blog-details';
import BlogSkeleton from '@/components/skeleton/blog-skeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogDetails id={id} />
    </Suspense>
  );
}
