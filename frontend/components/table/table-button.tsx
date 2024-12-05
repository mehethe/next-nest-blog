'use client';

import Icon from '@/types/icon';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  variant?: 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon: Icon;
  strokeWidth?: number;
  isRow?: boolean;
  onClick?: () => void;
};

export default function TableButton({
  icon,
  variant,
  className,
  strokeWidth,
  isRow,
  onClick,
}: Props) {
  const Icon = icon;

  return (
    <Button
      className={cn(
        'focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full h-auto',
        isRow ? 'p-[4px]' : 'p-[5px]',
        className
      )}
      size={'sm'}
      variant={variant}
      onClick={onClick}
    >
      <Icon size={isRow ? 16 : 18} strokeWidth={strokeWidth} />
    </Button>
  );
}
