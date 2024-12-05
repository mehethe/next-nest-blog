import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  image: string;
  className?: string;
};

export default function RowImage({ image, className }: Props) {
  return (
    <Image
      src={image}
      alt=''
      width={120}
      height={120}
      className={cn('w-10 h-10 rounded-full object-cover', className)}
    />
  );
}
