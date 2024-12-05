import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu';

type Props = {
  user: SessionUser | null;
};

const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <DropdownMenuItem asChild>
        <Link
          href='/dashboard'
          className='flex flex-col gap-[2px] cursor-pointer'
          style={{ alignItems: 'start' }}
        >
          <span className='capitalize text-sm leading-3 font-medium line-clamp-1'>
            {user.name}
          </span>
          <span className='font-medium text-xs text-muted-foreground'>
            {user.isAdmin ? 'Admin' : 'Member'}
          </span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default UserInfo;
