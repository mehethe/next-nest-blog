'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MouseEvent, ReactNode, useState } from 'react';
import Table from '@/types/table';
import useTableForm from '@/hooks/use-table-form';
import useNotification from '@/hooks/use-notification';
import SubmitButton from '../form/submit-button';

type Props = {
  table: Table;
  children: ReactNode;
  id: string;
};

export function DeleteConfirmation({ table, children, id }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = useNotification();
  const { title, deleteAction } = useTableForm({ table });

  if (!deleteAction) {
    return null;
  }

  const handleDelete = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const { success, message } = await deleteAction({
      id,
    });
    setIsLoading(false);

    if (success) {
      showNotification({ message });
      setOpen(false);
    } else {
      showNotification({ message, variant: 'error' });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this {title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the data
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              type='button'
              isLoading={isLoading}
              onClick={handleDelete}
            >
              Remove
            </SubmitButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
