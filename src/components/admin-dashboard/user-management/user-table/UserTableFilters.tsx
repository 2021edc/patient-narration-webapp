import FormInput from '@/atoms/formelements/FormInput';
import { Button } from '@/components/ui/button';
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import AddUserForm from '../AddUserForm';

interface UserTableFilterProps<TData> {
  table: Table<TData>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}

// component renders table filters for columns in user table
const UserTableFilters = <TData,>({
  table,
  setColumnFilters,
  setSorting,
}: UserTableFilterProps<TData>) => {
  return (
    <div>
      <h4 className="text-sm">Filter by:</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-4 items-center">
        <FormInput
          id="namefilter"
          name="namefilter"
          label="Name"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('user_name')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value:
              (table.getColumn('user_name')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>
        <FormInput
          id="subjectfilter"
          name="subjectfilter"
          label="Email"
          inputClassName="!p-[6px]"
          labelClassName="mb-1 text-xs"
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          inputElementProps={{
            value: (table.getColumn('email')?.getFilterValue() as string) ?? '',
          }}
        ></FormInput>

        <div>
          <Button
            onClick={() => {
              setColumnFilters([]);
              setSorting([]);
            }}
            className="w-full !p-6 text-base"
          >
            Reset Filters
          </Button>
        </div>
        <div>
          <AddUserForm></AddUserForm>
        </div>
      </div>
    </div>
  );
};

export default UserTableFilters;
