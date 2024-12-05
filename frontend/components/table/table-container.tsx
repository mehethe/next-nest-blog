import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import TableSkeleton from '../skeleton/table-skeleton';

type Props = {
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
  className?: string;
};

export default function TableContainer({
  title,
  children,
  buttons,
  className,
}: Props) {
  return (
    <div className={cn('h-full bg-background rounded-xl', className)}>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-semibold '>{title}</h1>
        {buttons}
      </div>
      <Suspense fallback={<TableSkeleton />} key={Math.random()}>
        {children}
      </Suspense>
    </div>
  );
}
