import SidebarMenuItem from './dashboard-sidebar-menu-item';
import Logo from '../navbar/logo';
import { cn } from '@/lib/utils';
import { FilePen, Home } from 'lucide-react';

export const menuItems = {
  home: {
    label: 'Home',
    path: '/dashboard',
    icon: Home,
  },
  blogs: {
    label: 'Blogs',
    path: '/dashboard/blogs',
    icon: FilePen,
  },
};

type Props = {
  isMobile?: boolean;
};

export default function Sidebar({ isMobile }: Props) {
  return (
    <div
      className={cn(
        isMobile ? 'flex flex-col' : 'hidden md:flex md:flex-col',
        'h-full max-h-screen border-r bg-muted/40  gap-2'
      )}
    >
      <div
        className={cn(
          isMobile ? 'px-6' : 'px-4',
          'flex h-14 items-center border-b lg:h-[60px] lg:px-6'
        )}
      >
        <Logo dashboard />
      </div>

      <nav
        className={cn(
          isMobile ? 'px-4' : 'px-2',
          'grid items-start text-sm font-medium lg:px-4'
        )}
      >
        {Object.keys(menuItems).map((item) => (
          <SidebarMenuItem item={item as 'home' | 'blogs'} key={item} />
        ))}
      </nav>
    </div>
  );
}
