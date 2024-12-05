import {
  Table as ShadTable,
  TableHead,
  TableHeader as ShadTableHeader,
  TableBody,
  TableRow,
} from '@/components/ui/table';
import { ReactNode } from 'react';
import NoDataAlert from '../common/no-data-alert';
import Pagination from '../common/pagination';

type ResData<T> = {
  success: boolean;
  message: string;
  data: { data: T[]; pages: number } | null;
};

type ColumnItem = {
  id: string;
  title: string;
  className?: string;
};

type Props<T extends { id: string | number }> = {
  res: ResData<T>;
  columns: ColumnItem[];
  renderRow: (dataItem: T) => ReactNode;
};

export default function Table<T extends { id: string | number }>({
  res,
  columns,
  renderRow,
}: Props<T>) {
  const { success, message, data } = res;

  if (!success) {
    return <NoDataAlert description={message} />;
  }

  const { data: items, pages } = data!;

  if (items.length === 0) {
    return <NoDataAlert />;
  }

  return (
    <>
      <ShadTable>
        <ShadTableHeader>
          <TableRow>
            {columns.map((item) => (
              <TableHead key={item.id} className={item?.className}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </ShadTableHeader>
        <TableBody>
          {items.map((item: T) => (
            <TableRow
              key={item.id}
              className='relative even:bg-secondary/50 hover:bg-primary/5'
            >
              {renderRow(item)}
            </TableRow>
          ))}
        </TableBody>
      </ShadTable>
      <Pagination pages={pages} />
    </>
  );
}
