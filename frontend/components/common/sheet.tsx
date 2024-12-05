'use client';

import {
  Sheet as ShadSheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  hideClose?: boolean;
};

export default function Sheet({
  trigger,
  children,
  side = 'right',
  className,
  hideClose,
}: Props) {
  return (
    <ShadSheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        side={side}
        className={cn('p-0', className, hideClose && '[&>button]:hidden')}
      >
        <SheetHeader className='hidden'>
          <SheetTitle>Side Menu</SheetTitle>
        </SheetHeader>
        <SheetDescription className='hidden'>
          Side menu navigation
        </SheetDescription>
        <div className='h-full'>{children}</div>
      </SheetContent>
    </ShadSheet>
  );
}
