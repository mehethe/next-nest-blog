'use client';

import TableButton from './table-button';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import useAuth from '@/hooks/use-auth';
import Table from '@/types/table';
import Blog from '@/types/blog';
import ModalForm from '../form/modal-form';
import { DeleteConfirmation } from './delete-confirmation';
import useTableForm from '@/hooks/use-table-form';

type Props = {
  data: Blog;
  table: Table;
};

export default function RowButtons({ table, data }: Props) {
  const { isAdmin } = useAuth();
  const { handleView } = useTableForm({ table });

  if (!handleView) {
    return null;
  }

  return (
    <div className='flex items-center justify-end gap-2'>
      <TableButton
        isRow
        icon={Eye}
        variant='outline'
        strokeWidth={1.2}
        onClick={() => handleView(data.id)}
      />

      <ModalForm table={table} edit={isAdmin ? 'admin' : 'user'} data={data}>
        <div>
          <TableButton
            isRow
            icon={SquarePen}
            variant='outline'
            strokeWidth={1}
          />
        </div>
      </ModalForm>

      <DeleteConfirmation table={table} id={data.id}>
        <div>
          <TableButton
            isRow
            icon={Trash2}
            variant='outline'
            strokeWidth={1.3}
            className='text-destructive hover:text-destructive'
          />
        </div>
      </DeleteConfirmation>
    </div>
  );
}
