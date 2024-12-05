'use client';

import { User } from 'lucide-react';
import NavButton from './nav-button';
import UserInfo from './user-info';
import Dropdown from '../dropdown';
import DropdownItem from '../dropdown/dropdown-item';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/use-auth';
import { signOut } from 'next-auth/react';
import useNotification from '@/hooks/use-notification';

const menu = [
  { label: 'user info', authOnly: true, navigate: undefined },
  { label: 'sign in', authOnly: false, navigate: '/auth' },
  { label: 'sign up', authOnly: false, navigate: '/auth?type=signup' },
  { label: 'sign out', authOnly: true, navigate: undefined },
];

export default function UserMenu() {
  const showNotification = useNotification();
  const { user } = useAuth();
  const router = useRouter();

  const handleSignout = () => {
    showNotification({ message: 'Signed out' });
    signOut({ callbackUrl: '/', redirect: true });
  };

  return (
    <Dropdown
      menu={menu}
      renderDropdownItem={({ label, navigate, authOnly }) =>
        label === 'user info' ? (
          <UserInfo key={label} user={user} />
        ) : (
          <DropdownItem
            key={label}
            label={label}
            onClick={() => (navigate ? router.push(navigate) : handleSignout())}
            hidden={(user && !authOnly) || (!user && authOnly)}
          />
        )
      }
    >
      <NavButton user icon={User} />
    </Dropdown>
  );
}
