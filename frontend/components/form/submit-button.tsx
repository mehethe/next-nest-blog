import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SubmitProps = {
  type?: 'submit';
  onClick?: undefined;
};

type ButtonProps = {
  type: 'button';
  onClick: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
};

type CommonProps = {
  className?: string;
  isLoading?: boolean;
  children: ReactNode;
  disabled?: boolean;
};

type Props = CommonProps & (SubmitProps | ButtonProps);

export default function SubmitButton({
  type = 'submit',
  onClick,
  className,
  isLoading,
  children,
  disabled = false,
}: Props) {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      className={cn('capitalize', className)}
      {...(onClick && {
        onClick,
      })}
    >
      {isLoading && <Loader2 className='mr-2 h-4 w-4 inline animate-spin' />}
      {children}
    </Button>
  );
}
