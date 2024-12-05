import { getBlogAction } from '@/actions/blog';
import NoDataAlert from '../common/no-data-alert';
import BlogCard from './blog-card';

type Props = {
  id?: string;
};

export default async function BlogDetails({ id }: Props) {
  const { success, message, data } = await getBlogAction({ id });

  if (!success || !data) {
    return <NoDataAlert description={message} />;
  }

  return <BlogCard blog={data} />;
}
