import FormInput from '@/atoms/formelements/FormInput';
import { Button } from '@/components/ui/button';
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import DropdownFilter from './DropdownFilter';

interface RequestFiltersProps<TData> {
  table: Table<TData>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

const RequestFilters = <TData,>({
  table,
  setColumnFilters,
  setSorting,
}: RequestFiltersProps<TData>) => {
  return (
    <div>
      <h4 className="text-sm">Filters</h4>
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-1 lg:gap-4">
        <DropdownFilter
          column={table.getColumn('study')}
          id={'studyfilter'}
          name={'studyfilter'}
          label={'Study'}
        ></DropdownFilter>
        <FormInput
          id="sitesfilter"
          name="sitesfilter"
          label="Sites"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('sites')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value: (table.getColumn('sites')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="subjectfilter"
          name="subjectfilter"
          label="Subjects"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('subjects')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('subjects')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="datefilter"
          name="datefilter"
          label="Date"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('createdOn')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('createdOn')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="ipAddress"
          name="ipAddress"
          label="IP Address"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('ipAddress')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('ipAddress')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <DropdownFilter
          column={table.getColumn('status')}
          id={'statusfilter'}
          name={'statusfilter'}
          label={'Status'}
        ></DropdownFilter>

        <div className="flex items-center">
          <Button
            onClick={() => {
              setColumnFilters([]);
              setSorting([]);
            }}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestFilters;
