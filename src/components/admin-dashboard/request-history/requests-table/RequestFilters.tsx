import FormInput from '@/atoms/formelements/FormInput';
import { Button } from '@/components/ui/button';
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import DropdownFilter from './DropdownFilter';
import DateRangeFilter from './DateRangeFilter';

// Component with filter input fields for the columns in Request History table

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
    <div className="mb-6">
      <h4 className="text-sm">Filters</h4>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1 lg:gap-2">
        <FormInput
          id="idfilter"
          name="idfilter"
          label="Request ID"
          labelClassName="mb-1 text-xs"
          inputClassName="!py-[5px] !rounded-md"
          showError={false}
          onChange={(event) =>
            table.getColumn('narration_id')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('narration_id')?.getFilterValue() as string) ??
              '',
          }}
        ></FormInput>
        <DropdownFilter
          column={table.getColumn('narration_type')}
          id={'studyfilter'}
          name={'studyfilter'}
          label={'Study'}
        ></DropdownFilter>
        <FormInput
          id="sitesfilter"
          name="sitesfilter"
          label="Sites"
          labelClassName="mb-1 text-xs"
          inputClassName="!py-[5px] !rounded-md"
          showError={false}
          onChange={(event) =>
            table
              .getColumn('narration_sites')
              ?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table
                .getColumn('narration_sites')
                ?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="subjectfilter"
          name="subjectfilter"
          label="Subjects"
          labelClassName="mb-1 text-xs"
          inputClassName="!py-[5px] !rounded-md"
          showError={false}
          onChange={(event) =>
            table
              .getColumn('narration_subjects')
              ?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table
                .getColumn('narration_subjects')
                ?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <DropdownFilter
          column={table.getColumn('created_by')}
          id={'createdbyfilter'}
          name={'createdbyfilter'}
          label={'Created By'}
        ></DropdownFilter>
        <FormInput
          id="ipAddress"
          name="ipAddress"
          label="IP Address"
          inputClassName="!py-[5px] !rounded-md"
          labelClassName="mb-1 text-xs"
          showError={false}
          onChange={(event) =>
            table
              .getColumn('user_ip_address')
              ?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table
                .getColumn('user_ip_address')
                ?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <DropdownFilter
          column={table.getColumn('status')}
          id={'statusfilter'}
          name={'statusfilter'}
          label={'Status'}
        ></DropdownFilter>
        <DateRangeFilter
          column={table.getColumn('created_on')}
          id="request_date"
          className="col-span-2 m-1"
          label="Created"
        ></DateRangeFilter>
        <DateRangeFilter
          column={table.getColumn('modified_on')}
          id="completed_date"
          className="col-span-2 m-1"
          label="Completed"
        ></DateRangeFilter>

        <div className="flex items-end mb-1">
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
