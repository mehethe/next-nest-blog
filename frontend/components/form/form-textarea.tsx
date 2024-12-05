import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  required?: boolean;
};

export default function FormTextarea({
  name,
  label,
  placeholder,
  description,
  className,
  disabled = false,
  readOnly = false,
  rows = 2,
  required,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className='text-destructive'>*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              className='text-sm'
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              rows={rows}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className='text-xs font-medium' />
        </FormItem>
      )}
    />
  );
}
