import SubmitButton from '@/components/form/submit-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form as ShadForm } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, any, undefined>;
  onSubmit: (data: T) => Promise<void>;
  children: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  width?: string;
  className?: string;
  buttonClassName?: string;
  asChild?: boolean;
};

export default function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  title,
  description,
  buttonLabel,
  width = 'max-w-[350px]',
  className = 'space-y-2',
  buttonClassName,
  asChild,
}: Props<T>) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <Card className={cn(width, asChild && 'border-none shadow-none')}>
      <ShadForm {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className={className}>{children} </CardContent>

          <CardFooter>
            <SubmitButton className={buttonClassName} isLoading={isSubmitting}>
              {buttonLabel}
            </SubmitButton>
          </CardFooter>
        </form>
      </ShadForm>
    </Card>
  );
}
