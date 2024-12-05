import BlogTable from '@/components/blog/blog-table';
import MainButtons from '@/components/table/main-buttons';
import TableContainer from '@/components/table/table-container';
import { convertFromEnum } from '@/lib/helper';
import FilterOptions from '@/types/filter-options';
import SortOptions from '@/types/sort-options';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function BlogsPage({ searchParams }: Props) {
  const { page, sort, filter } = await searchParams;

  return (
    <div className='h-full'>
      <TableContainer
        title={`${convertFromEnum(filter) || 'All'} Blogs`}
        buttons={<MainButtons table='blog' />}
      >
        <BlogTable
          page={page}
          sort={sort as SortOptions}
          filter={filter as FilterOptions}
        />
      </TableContainer>
    </div>
  );
}
