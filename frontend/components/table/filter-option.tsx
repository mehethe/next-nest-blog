import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import TableButton from './table-button';
import { Filter } from 'lucide-react';
import useSearchObject from '@/hooks/use-search-object';
import Dropdown from '../dropdown';

type filterItem = {
  name: string;
  value: string;
};

const filterOptions = [
  { name: 'All', value: '' },
  { name: 'Pending', value: 'PENDING' },
  { name: 'Published', value: 'PUBLISHED' },
];

export function FilterOption() {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchObject: { filter = '', page, ...rest },
    setSearchParams,
  } = useSearchObject();

  const handleChange = (value: string) => {
    if (filter === value) {
      return;
    }

    if (value) {
      setSearchParams({ ...rest, filter: value });
    } else {
      setSearchParams(rest);
    }
  };

  return (
    <Dropdown
      label='Filter'
      className='w-[120px]'
      menu={filterOptions}
      renderDropdownItem={(item: filterItem) => (
        <DropdownMenuCheckboxItem
          key={item.value}
          className='cursor-pointer'
          checked={filter === item.value}
          onClick={() => handleChange(item.value)}
        >
          {item.name}
        </DropdownMenuCheckboxItem>
      )}
    >
      <TableButton icon={Filter} />
    </Dropdown>
  );
}
