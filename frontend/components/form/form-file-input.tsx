'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormEvent, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { uploadImage } from '@/config/cloudinary';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  name: string;
  label: string;
  className?: string;
  accept?: string;
  disabled?: boolean;
  preview?: 'square' | 'wide';
  description?: string;
  required?: boolean;
};

export default function FormFileInput({
  name,
  label,
  className,
  accept = 'image/*',
  disabled = false,
  preview = 'square',
  description,
  required,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { setValue, trigger, setError, control } = useFormContext();

  const imageInput = accept === 'image/*';

  const handleSelectImage = async (e: FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const file = inputElement?.files?.[0];

    if (file) {
      setLoading(true);
      const { imageUrl, errorMsg } = await uploadImage(file);
      if (imageUrl) {
        setValue(name, imageUrl);
        trigger([name]);
      } else {
        setError(name, {
          type: 'image upload error',
          message: errorMsg as string,
        });
        inputElement.value = '';
      }
      setLoading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='mb-4'>
            {field?.value?.length > 0 ? (
              <div
                className={cn(
                  'overflow-hidden',
                  preview === 'square'
                    ? 'h-20 w-20 rounded-full'
                    : 'w-40 aspect-video rounded-lg'
                )}
              >
                <Image
                  fill
                  src={field.value}
                  className='!relative object-cover'
                  alt='image'
                />
              </div>
            ) : (
              <div
                className={cn(
                  'bg-secondary',
                  preview === 'square'
                    ? 'h-20 w-20 rounded-full'
                    : 'w-40 aspect-video rounded-lg'
                )}
              />
            )}
          </div>

          <FormLabel>
            {label}
            {required && <span className='text-destructive'>*</span>}
          </FormLabel>

          <FormControl>
            <div className='flex'>
              <Button
                variant='outline'
                className='rounded-r-none bg-secondary/50'
                type='button'
                disabled={loading || disabled}
              >
                <label
                  htmlFor={`file-input-${name}`}
                  className={cn(
                    loading ? 'pointer-events-none' : 'cursor-pointer'
                  )}
                >
                  {loading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin inline-block' />
                  )}{' '}
                  {field.value ? 'Change' : 'Upload'}
                </label>
              </Button>

              <input
                id={`file-input-${name}`}
                name={`file-input-${name}`}
                type='file'
                className='hidden'
                accept={accept}
                onChange={
                  imageInput
                    ? handleSelectImage
                    : () => {
                        console.log('implement other upload');
                      }
                }
                disabled={loading || disabled}
              />
              <Input
                placeholder='No File Selected'
                readOnly
                value={field.value}
                className='text-sm rounded-l-none focus-visible:ring-0'
                disabled={loading || disabled}
              />
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className='text-xs font-medium' />
        </FormItem>
      )}
    />
  );
}
