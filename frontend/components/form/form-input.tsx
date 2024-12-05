'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type NumberInput = {
  type: 'number';
  min?: number;
};

type CommonInput = {
  type?: 'text' | 'password';
  min?: undefined;
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
} & (CommonInput | NumberInput);

export default function FormInput({
  name,
  label,
  placeholder,
  description,
  className,
  type = 'text',
  disabled = false,
  readOnly = false,
  min,
  required,
}: Props) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const PasswordIcon = showPassword ? EyeOff : Eye;

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

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
            <div className='relative'>
              <Input
                className='text-sm'
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                {...(type === 'number' && { min, step: 'any' })}
              />
              {type === 'password' && (
                <Button
                  type='button'
                  onClick={handleTogglePassword}
                  variant={'link'}
                  size='sm'
                  className='h-auto p-1 rounded-full absolute top-[6px] right-[6px] text-muted-foreground/70 hover:text-primary/70'
                >
                  <PasswordIcon size={18} />
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className='text-xs font-medium' />
        </FormItem>
      )}
    />
  );
}
