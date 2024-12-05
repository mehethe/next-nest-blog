import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  rows?: number;
  columns?: number;
};

export default function TableSkeleton({ rows = 4, columns = 4 }: Props) {
  const rowData = [...Array(rows)];
  const columnData = [...Array(columns)];

  return (
    <ShadTable>
      <TableHeader>
        <TableRow>
          {columnData.map((_, i) => (
            <TableHead key={i} className={cn(i > 1 && 'hidden sm:table-cell')}>
              <Skeleton
                className={cn(
                  i > 1 ? 'w-[40%]' : 'w-[70%] sm:w-[40%]',
                  'h-4 mb-2'
                )}
              />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowData.map((_, i) => (
          <TableRow
            key={i}
            className='relative even:bg-secondary/50 hover:bg-primary/5'
          >
            {columnData.map((_, j) => (
              <TableCell
                key={j}
                className={cn(j > 1 && 'hidden sm:table-cell')}
              >
                <div className='flex items-center h-10'>
                  <Skeleton className='h-4 mb-2 w-[70%]' />
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}
