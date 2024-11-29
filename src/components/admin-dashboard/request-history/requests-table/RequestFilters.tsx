import FormInput from '@/atoms/formelements/FormInput';
import { Button } from '@/components/ui/button';
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import DropdownFilter from './DropdownFilter';

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
    <div>
      <h4 className="text-sm">Filters</h4>
      <div className="grid grid-cols-3 lg:grid-cols-8 gap-1 lg:gap-4">
        <FormInput
          id="idfilter"
          name="idfilter"
          label="Request ID"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
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
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
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
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
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
        <FormInput
          id="datefilter"
          name="datefilter"
          label="Date"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('created_on')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('created_on')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="ipAddress"
          name="ipAddress"
          label="IP Address"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
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

        <div className="flex items-end lg:items-center">
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
