'use client';

import NavButton from './nav-button';
import { useTheme } from 'next-themes';
import Dropdown from '../dropdown';
import DropdownItem from '../dropdown/dropdown-item';

const menu = [
  {
    label: 'light',
  },
  {
    label: 'dark',
  },
  {
    label: 'system',
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown
      menu={menu}
      renderDropdownItem={({ label }) => (
        <DropdownItem
          key={label}
          label={label}
          isSelected={theme === label}
          onClick={() => setTheme(label)}
        />
      )}
    >
      <NavButton theme />
    </Dropdown>
  );
}
