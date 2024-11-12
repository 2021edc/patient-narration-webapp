import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

interface DropdownFilterProps<TData> {
  column: Column<TData> | undefined;
  id: string;
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const DropdownFilter = <TData,>({
  column,
  id,
  name,
  label,
  className = '',
  labelClassName = '',
  inputClassName = '',
}: DropdownFilterProps<TData>) => {
  const columnFilterValue = column?.getFilterValue();
  const isAllOption = !columnFilterValue;
  const uniqueValues = useMemo(
    () => (column ? Array.from(column?.getFacetedUniqueValues().keys()) : []),
    [column]
  );
  return (
    <div className={`w-full ${className}`}>
      <label
        className={`text-light-gray mb-1 text-xs ${labelClassName}`}
        htmlFor={id}
      >
        {label}
      </label>
      <Select
        name={name}
        onValueChange={(value) => column?.setFilterValue(value)}
        value={isAllOption ? '' : columnFilterValue?.toString()}
      >
        <SelectTrigger className="border text-dark-gray border-light-gray">
          <SelectValue placeholder={'Select an option'}></SelectValue>
        </SelectTrigger>
        <SelectContent
          id={id}
          className={`bg-white text-black ${inputClassName}`}
        >
          <SelectGroup>
            {uniqueValues.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownFilter;
