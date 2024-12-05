import { ThemeToggle } from '../navbar/theme-toggle';
import UserMenu from '../navbar/user-menu';
import MobileSidebar from './dashboard-mobile-sidebar';

export default function Header() {
  return (
    <header className='flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      <MobileSidebar />
      <div className='flex items-center gap-3'>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
