import Table from '../table';
import SortOptions from '@/types/sort-options';
import FilterOptions from '@/types/filter-options';
import BlogTableRow from './blog-table-row';
import Blog from '@/types/blog';
import { getBlogsAction } from '@/actions/blog';

type Props = {
  page?: string;
  sort?: SortOptions;
  filter?: FilterOptions;
};

const colums = [
  {
    id: 'info',
    title: 'Info',
  },
  {
    id: 'author',
    title: 'Author',
    className: 'hidden sm:table-cell',
  },
  {
    id: 'added',
    title: 'Added',
    className: 'hidden md:table-cell',
  },
  {
    id: 'status',
    title: 'Status',
    className: 'hidden lg:table-cell',
  },
  {
    id: 'action',
    title: 'Action',
    className: 'text-right sr-only',
  },
];

export default async function BlogTable({ page, sort, filter }: Props) {
  const response = await getBlogsAction({
    page,
    sort,
    filter,
    isDashboard: true,
  });

  return (
    <Table
      res={response}
      columns={colums}
      renderRow={(item: Blog) => <BlogTableRow blog={item} />}
    />
  );
}
