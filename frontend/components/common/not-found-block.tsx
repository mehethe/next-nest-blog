'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

type Props = { backLink: string };

export default function NotFoundBlock({ backLink }: Props) {
  const router = useRouter();

  const handleBack = () => router.replace(backLink);

  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
      <div className='mx-auto max-w-screen-sm text-center'>
        <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary'>
          404
        </h1>
        <p className='mb-4 text-3xl tracking-tight font-bold text-primary'>
          {`Something's missing.`}
        </p>
        <p className='mb-4 text-lg font-light text-muted-foreground'>
          {`Sorry, we can't find the page you are looking for.`}
        </p>
        <Button onClick={handleBack}>Back to Home</Button>
      </div>
    </div>
  );
}
