import { getBlogsAction } from '@/actions/blog';
import NoDataAlert from '../common/no-data-alert';
import Pagination from '../common/pagination';
import Blog from '@/types/blog';
import BlogCard from './blog-card';

type Props = {
  page?: string;
};

export default async function BlogGrid({ page }: Props) {
  const { success, message, data } = await getBlogsAction({
    page,
  });

  if (!success) {
    return <NoDataAlert description={message} />;
  }

  const { data: items, pages } = data!;

  if (items.length === 0) {
    return <NoDataAlert />;
  }

  return (
    <>
      <div className='grid sm:grid-cols-2 gap-y-16 gap-x-8 mb-8'>
        {items.map((item: Blog) => (
          <BlogCard key={item.id} blog={item} isHome />
        ))}
      </div>
      <Pagination pages={pages} />
    </>
  );
}
