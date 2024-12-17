import { DateRangePicker } from '@/components/ui/daterangepicker';
import { Column } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DateRangeFilterProps<TData> {
  column: Column<TData> | undefined;
  id: string;
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const DateRangeFilter = <TData,>({
  column,
  id,
  label,
  className = '',
  labelClassName = '',
  inputClassName = '',
}: DateRangeFilterProps<TData>) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const columnFilterValue = column?.getFilterValue();

  useEffect(() => {
    column?.setFilterValue(date);
  }, [date, column]);

  useEffect(() => {
    if (!columnFilterValue) {
      setDate(undefined);
    }
  }, [columnFilterValue]);

  return (
    <div className={`${className} mb-1`}>
      <p className={`text-light-gray mb-1 text-xs ${labelClassName}`}>
        {label}
      </p>
      <DateRangePicker
        id={id}
        date={date}
        setDate={setDate}
        className={inputClassName}
        disableFutureDates={true}
      ></DateRangePicker>
    </div>
  );
};

export default DateRangeFilter;
