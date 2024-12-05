import Blog from '@/types/blog';
import RowImage from '../table/row-image';
import { TableCell } from '../ui/table';
import { convertFromEnum, formatDate } from '@/lib/helper';
import RowButtons from '../table/row-buttons';

type Props = {
  blog: Blog;
};

export default function BlogTableRow({ blog }: Props) {
  return (
    <>
      <TableCell className='flex blogs-center gap-4 py-4 pr-4 max-w-[300px]'>
        <RowImage image={blog.cover} className='hidden sm:block' />
        <div className='flex flex-col'>
          <h3 className='font-semibold line-clamp-1'>{blog.title}</h3>
          <p className='text-xs text-muted-foreground line-clamp-1'>
            {blog.content}
          </p>
        </div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        <p className='line-clamp-1'>{blog.author.name}</p>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <p className='line-clamp-1'>{formatDate(blog.createdAt)}</p>
      </TableCell>
      <TableCell className='hidden lg:table-cell'>
        <p className='line-clamp-1'>{convertFromEnum(blog.status)}</p>
      </TableCell>
      <TableCell>{<RowButtons data={blog} table='blog' />}</TableCell>
    </>
  );
}
