'use client';

import Blog from '@/types/blog';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/helper';
import Image from 'next/image';

type Props = {
  blog: Blog;
  isHome?: boolean;
};

export default function BlogCard({ blog, isHome }: Props) {
  const router = useRouter();

  return (
    <article className='space-y-10 group'>
      {/*cover*/}
      <div className='overflow-hidden rounded-xl'>
        <Image
          fill
          alt={blog.title}
          src={blog.cover}
          className='!relative object-cover aspect-video sm:aspect-[16/7] md:aspect-[16/5] w-full h-auto  group-hover:scale-110 transform transition-all duration-300'
        />
      </div>
      <div>
        {/*Content*/}
        <article className='space-y-6'>
          <div className='space-y-2'>
            <h1 className={cn('text-3xl font-bold', isHome && 'line-clamp-1')}>
              {blog.title}
            </h1>
            <div className='text-muted-foreground text-sm'>
              <p>
                <span className='font-semibold'>Author:</span>{' '}
                {blog.author.name}
              </p>
              <p>
                <span className='font-semibold'>Published on:</span>{' '}
                {formatDate(blog.createdAt)}
              </p>
            </div>
          </div>
          <p
            className={cn(
              'text-muted-foreground whitespace-pre-wrap',
              isHome && 'line-clamp-3'
            )}
          >
            {blog.content}
          </p>
        </article>
        {/*Button*/}
        {isHome && (
          <Button
            variant={'link'}
            className='pl-0'
            onClick={() => router.push(`/blogs/${blog.id}`)}
          >
            Continue Reading
          </Button>
        )}
      </div>
    </article>
  );
}
