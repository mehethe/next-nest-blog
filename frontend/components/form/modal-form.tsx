'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import useNotification from '@/hooks/use-notification';
import { isInfoUnchanged } from '@/lib/helper';
import Form from '.';
import Table from '@/types/table';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useTableForm from '@/hooks/use-table-form';

type EditProps<T> = {
  edit: 'user' | 'admin';
  data: T;
};

type AddProps = {
  edit?: undefined;
  data?: undefined;
};

type Props<T extends Record<string, any>> = {
  table: Table;
  children: ReactNode;
} & (AddProps | EditProps<T>);

export default function ModalForm<T extends Record<string, any>>({
  children,
  data,
  edit,
  table,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const showNotification = useNotification();
  const {
    defaultValues,
    schema,
    renderFormFields,
    action,
    editedFiledsCheck = [],
    title,
    description,
  } = useTableForm({ table, edit });

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    shouldFocusError: false,
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (edit && data) {
      reset(data);
    }
  }, [edit, data, reset]);

  if (!action) {
    return null;
  }

  const onSubmit = async <T extends Record<string, any> & { id?: string }>(
    formData: T
  ) => {
    //prevent if unchanged for edit
    if (edit) {
      const isUnchanged = isInfoUnchanged(editedFiledsCheck, data, formData);

      if (isUnchanged) {
        showNotification({
          message: 'Nothing to update',
          variant: 'info',
        });
        return;
      }
      formData.id = data.id;
    }

    const { success, message } = await action!(formData as any);

    if (success) {
      showNotification({ message });
      reset(defaultValues);
      setIsOpen(false);
    } else {
      showNotification({
        message,
        variant: 'error',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className='sm:max-w-[425px] p-0'
      >
        <DialogHeader className='hidden'>
          <DialogTitle>Modal Form</DialogTitle>
          <DialogDescription>Add or edit your form</DialogDescription>
        </DialogHeader>
        <Form
          form={form}
          title={edit ? 'Update ' : 'New ' + title}
          description={description}
          onSubmit={onSubmit}
          buttonLabel={edit ? 'Update' : 'Save'}
          width='w-full'
          asChild
        >
          <ScrollArea className='h-auto [&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-60vh)] sm:[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-40vh)] -my-2 -mx-[23px]'>
            <div className='space-y-2 px-6 pb-4'>
              {renderFormFields(isSubmitting)}
            </div>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
