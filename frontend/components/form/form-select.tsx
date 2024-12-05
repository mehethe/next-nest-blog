'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  options: { id: string; name: string }[];
  required?: boolean;
};

export default function FormSelect({
  name,
  label,
  placeholder = 'Select an option',
  description,
  className,
  disabled = false,
  options,
  required,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label}
            {required && <span className='text-destructive'>*</span>}
          </FormLabel>

          <div className='space-y-2'>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl
                className={cn(
                  'hover:text-foreground',
                  !field.value && 'text-muted-foreground'
                )}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='max-h-56'>
                {options.map((option) => (
                  <ScrollArea className='max-h-56' key={option.id}>
                    <SelectItem value={option.id} className='cursor-pointer'>
                      {option.name}
                    </SelectItem>
                  </ScrollArea>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className='text-xs font-medium' />
          </div>
        </FormItem>
      )}
    />
  );
}
