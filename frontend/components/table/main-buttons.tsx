'use client';

import { Plus } from 'lucide-react';
import TableButton from './table-button';
import useAuth from '@/hooks/use-auth';
import { FilterOption } from './filter-option';
import SortOption from './sort-option';
import Table from '@/types/table';
import ModalForm from '../form/modal-form';

type Props = {
  table: Table;
};

export default function MainButtons({ table }: Props) {
  const { isAdmin } = useAuth();

  return (
    <div className='flex items-center gap-2'>
      <FilterOption />
      <SortOption />
      {!isAdmin && (
        <ModalForm table={table}>
          <TableButton icon={Plus} />
        </ModalForm>
      )}
    </div>
  );
}
