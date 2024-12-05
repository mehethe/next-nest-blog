import { MoonStar, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import Icon from '@/types/icon';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

type ThemeProps = {
  theme: true;
  user?: undefined;
  icon?: undefined;
  onClick?: undefined;
  className?: string;
};

type CommonProps = {
  theme?: undefined;
  user?: boolean;
  icon: Icon;
  onClick?: () => void;
  className?: string;
};

type Props = CommonProps | ThemeProps;

export default function NavButton({
  theme,
  user,
  icon,
  onClick,
  className,
}: Props) {
  const { theme: themeMod } = useTheme();
  const Icon = theme ? (themeMod === 'dark' ? MoonStar : Sun) : icon;

  return (
    <Button
      {...(onClick && {
        onClick,
      })}
      variant={cn(user ? undefined : 'outline') as undefined | 'outline'}
      size={'icon'}
      className={cn(
        className,
        user
          ? 'text-background hover:bg-primary/90'
          : 'text-primary hover:bg-secondary hover:dark:bg-backgrond/90 border border-primary/30 dark:border-white/50',
        'transform transition-all duration-300 rounded-full relative focus-visible:ring-0 focus-visible:ring-offset-0'
      )}
    >
      <Icon />
    </Button>
  );
}
