import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

export default function NoDataAlert({
  title = 'Oops! Nothing Here',
  description = "We couldn't find the item you're searching for",
  className,
}: Props) {
  return (
    <Alert className={cn('max-w-lg shadow-sm mt-12', className)}>
      <TriangleAlert className='h-4 w-4 stroke-primary' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className='text-muted-foreground'>
        {description}
      </AlertDescription>
    </Alert>
  );
}
