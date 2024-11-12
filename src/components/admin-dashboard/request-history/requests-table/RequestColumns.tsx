'use client';

import { Button } from '@/components/ui/button';
import { CaretSortIcon, DownloadIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type IRequest = {
  id: string;
  study: string;
  sites: string;
  subjects: string;
  createdOn: string;
  ipAddress: string;
  status: string;
  downloadLink: string;
};

export const request_history_columns: ColumnDef<IRequest>[] = [
  {
    accessorKey: 'study',
    header: 'Study',
  },
  { accessorKey: 'sites', header: 'Sites' },
  { accessorKey: 'subjects', header: 'Subjects' },
  {
    accessorKey: 'createdOn',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex gap-2 items-center"
          >
            Date
            <CaretSortIcon className="h-5 w-5"></CaretSortIcon>
          </Button>
        </div>
      );
    },
    sortingFn: 'datetime',
  },
  { accessorKey: 'ipAddress', header: 'IP Address' },
  { accessorKey: 'status', header: 'Status' },
  {
    accessorKey: 'downloadLink',
    header: 'Download',

    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Link
          href={row.original.downloadLink}
          download={'zip'}
          className="w-max"
        >
          <DownloadIcon className="h-6 w-6"></DownloadIcon>
        </Link>
      </div>
    ),
  },
];
