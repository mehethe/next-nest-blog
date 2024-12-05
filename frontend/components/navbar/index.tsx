import Logo from './logo';
import { ThemeToggle } from './theme-toggle';
import UserMenu from './user-menu';

export default function Navbar() {
  return (
    <header className='h-[68px] border-b-2 border-b-primary'>
      <div className='h-full container mx-auto flex justify-between items-center'>
        <Logo />
        <nav className='flex items-center gap-3'>
          <ThemeToggle />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
