import BlogGrid from '@/components/blog/blog-grid';
import BlogSkeleton from '@/components/skeleton/blog-skeleton';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ page: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;

  return (
    <section>
      <Suspense fallback={<BlogSkeleton num={2} />}>
        <BlogGrid page={page} />
      </Suspense>
    </section>
  );
}
