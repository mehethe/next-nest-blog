import { DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import TableButton from './table-button';
import { ArrowDownWideNarrow } from 'lucide-react';
import useSearchObject from '@/hooks/use-search-object';
import Dropdown from '../dropdown';

type SortItem = {
  name: string;
  value: string;
};

const sortOptions = [
  { name: 'Name', value: 'name' },
  { name: 'Date', value: 'date' },
];

export default function SortOption() {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchObject: { sort = 'date', page, ...rest },
    setSearchParams,
  } = useSearchObject();

  const handleSortChange = (val: string) => {
    if (sort === val) {
      return;
    }
    setSearchParams({ ...rest, sort: val });
  };

  return (
    <Dropdown
      type='radio'
      label='Sort'
      className='w-[100px]'
      menu={sortOptions}
      value={sort}
      onValueChange={handleSortChange}
      renderDropdownItem={(item: SortItem) => (
        <DropdownMenuRadioItem
          key={item.value}
          value={item.value}
          className='cursor-pointer'
        >
          {item.name}
        </DropdownMenuRadioItem>
      )}
    >
      <TableButton icon={ArrowDownWideNarrow} />
    </Dropdown>
  );
}
