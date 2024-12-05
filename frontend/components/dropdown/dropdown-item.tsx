import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '../ui/dropdown-menu';

type Props = {
  onClick: () => void;
  isSelected?: boolean;
  label: string;
  hidden?: boolean;
};

export default function DropdownItem({
  onClick,
  isSelected,
  label,
  hidden,
}: Props) {
  return hidden ? null : (
    <DropdownMenuItem
      onClick={onClick}
      className={cn(
        'cursor-pointer capitalize',
        isSelected && 'bg-secondary font-medium'
      )}
    >
      {label}
    </DropdownMenuItem>
  );
}
