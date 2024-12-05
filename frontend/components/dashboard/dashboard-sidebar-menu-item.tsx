'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { menuItems } from './dashboard-sidebar';

type Props = { item: 'home' | 'blogs' };

export default function SidebarMenuItem({ item }: Props) {
  const { path, label, icon } = menuItems[item];

  const pathname = usePathname();

  const Icon = icon;

  const isActive = useMemo(
    () =>
      (path === '/dashboard' && pathname === path) ||
      (path !== '/dashboard' && pathname.includes(path)),
    [path, pathname]
  );

  return (
    <Link
      href={path}
      className={cn(
        isActive ? 'text-primary bg-muted' : 'text-muted-foreground',
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
      )}
    >
      <Icon className='h-4 w-4' />
      {label}
    </Link>
  );
}
