'use client';

import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { exportToExcel } from '@/utils/file-export';
import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/atoms/LoadingSpinner';
import { RevalidatePathAction } from '@/actions/revalidatdata.action';

interface RequestHistoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const RequestHistoryTable = <Tdata, TValue>({
  columns,
  data,
}: RequestHistoryTableProps<Tdata, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // creating the table with columns, table state.
  const table = useReactTable({
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
    const todayDate = new Date().toLocaleDateString();
    exportToExcel({
      data,
      fileName: `Request_History_${todayDate}_${new Date().toISOString()}.xlsx`,
    });
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    RevalidatePathAction(pathName);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // rendering table, table filters, export table button

  return (
    <div>
      <div className="sticky top-16 bg-white">
        <div className="w-full flex items-center justify-end  gap-4 my-2">
          <Button onClick={handleExport} className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4"></DownloadIcon>
            Export Table
          </Button>
          <Button
            className="flex gap-2 items-center min-w-32"
            onClick={handleRefresh}
          >
            {isLoading ? (
              <LoadingSpinner className="h-4 w-4"></LoadingSpinner>
            ) : (
              <>
                <ReloadIcon /> Refresh
              </>
            )}
          </Button>
        </div>
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
