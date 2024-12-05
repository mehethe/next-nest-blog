import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useMemo } from 'react';

type GenericProps = {
  type?: undefined;
  value?: undefined;
  onValueChange?: undefined;
};

type RadioProps = {
  type: 'radio';
  value: string;
  onValueChange: (val: string) => void;
};

type Props<T> = {
  label?: string;
  menu: T[];
  renderDropdownItem: (menuItem: T) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
} & (GenericProps | RadioProps);

export default function Dropdown<T>({
  menu,
  renderDropdownItem,
  children,
  className,
  label,
  type,
  value,
  onValueChange,
}: Props<T>) {
  const isRadio = type === 'radio';

  const renderedMenuItems = useMemo(
    () => menu.map((menuItem) => renderDropdownItem(menuItem)),
    [menu, renderDropdownItem]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className={cn('flex flex-col gap-[1px] min-w-0', className)}
      >
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {isRadio ? (
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {renderedMenuItems}
          </DropdownMenuRadioGroup>
        ) : (
          renderedMenuItems
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
