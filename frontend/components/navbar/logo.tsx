import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  dashboard?: boolean;
};

const Logo = ({ dashboard }: Props) => {
  return (
    <Link
      href='/'
      className={cn(
        dashboard ? 'text-2xl' : 'text-3xl',
        'tracking-tight text-primary font-bold'
      )}
    >
      NN Blog
    </Link>
  );
};

export default Logo;
