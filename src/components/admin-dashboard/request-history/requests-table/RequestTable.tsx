'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import RequestFilters from './RequestFilters';
import { exportToExcel } from '@/utils/file-export';
import RequestTableActions from './RequestTableActions';
import { useState } from 'react';
import { IRequestDetailFormatted } from '@/types/api/request-history';

interface RequestHistoryTableProps {
  columns: ColumnDef<IRequestDetailFormatted>[];
  data: IRequestDetailFormatted[];
}

const RequestHistoryTable = ({ columns, data }: RequestHistoryTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // creating the table with columns, table state.
  const table = useReactTable<IRequestDetailFormatted>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // exporting the table data to excel file.
  const handleExport = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sanitizedData = data.map(({ id, user_id, ...rest }) => rest);
    exportToExcel({
      data: sanitizedData,
      fileName: `Request_History_${new Date().toISOString()}.xlsx`,
    });
  };

  // rendering table, table filters, export table button

  return (
    <div>
      <div className="sticky top-28 md:top-16 bg-white z-50">
        <RequestTableActions handleExport={handleExport}></RequestTableActions>
        <RequestFilters
          table={table}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
        ></RequestFilters>
      </div>

      <Table className="my-1">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="bg-dark-gray text-white py-2 text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-4 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestHistoryTable;
