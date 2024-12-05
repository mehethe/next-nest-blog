import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type Props = {
  num?: number;
};

export default function BlogSkeleton({ num = 1 }: Props) {
  const arr = [...Array(num)];

  return (
    <div className={cn(num > 1 && 'grid sm:grid-cols-2 gap-y-16 gap-x-8')}>
      {arr.map((_, i) => (
        <section key={i} className='space-y-10'>
          {/* Cover */}
          <Skeleton className='aspect-video sm:aspect-[16/7] md:aspect-[16/5] w-full h-auto rounded-xl' />
          {/* Content */}
          <div className='space-y-6'>
            <Skeleton className='w-[60%] h-8' />
            <div className='space-y-2'>
              <Skeleton className='w-full h-4' />
              <Skeleton className='w-full h-4' />
              <Skeleton className='w-[40%] h-4' />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
