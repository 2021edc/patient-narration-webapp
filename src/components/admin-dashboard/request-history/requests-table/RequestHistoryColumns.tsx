'use client';

import ColumnSortButton from '@/atoms/ColumnSortButton';
import { IRequestDetailFormatted } from '@/types/api/request-history';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import RequestHistoryTable from './RequestTable';
import { Button } from '@/components/ui/button';
import DownloadFileDialog from './DownloadFileDialog';
import { useCallback, useState } from 'react';
import { dateUtcToIso } from '@/utils/dates';

interface RequestHistoryColumnsProps {
  data: IRequestDetailFormatted[];
}

// Component to define request history table columns, and pass the columns to table.

const RequestHistoryColumns = ({ data }: RequestHistoryColumnsProps) => {
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setSelectedReqId(null);
    setOpenDialog(false);
  };

  const formatDateFunction = useCallback(
    (dateString: string) => dateUtcToIso(dateString),
    []
  );

  const dateFilterFunction = useCallback(
    (
      row: Row<IRequestDetailFormatted>,
      columnId: string,
      filterValue: string
    ) => {
      if (!filterValue) return true;
      const filterString = filterValue.toLowerCase();
      const columnValue: string = row.renderValue(columnId);
      const formattedDate = formatDateFunction(columnValue);
      return formattedDate.includes(filterString);
    },
    [formatDateFunction]
  );

  // Column definitions for request history table
  const RequestColumns: ColumnDef<IRequestDetailFormatted>[] = [
    {
      accessorKey: 'narration_id',
      header: 'ID',
    },
    {
      accessorKey: 'narration_type',
      header: 'Type',
    },
    {
      accessorKey: 'narration_sites',
      header: 'Sites',
    },
    {
      accessorKey: 'narration_subjects',
      header: 'Subjects',
    },
    {
      accessorKey: 'created_on',
      header: ({ column }) => (
        <ColumnSortButton
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          title={'Date'}
          isSorting={column.getIsSorted()}
        ></ColumnSortButton>
      ),
      cell: ({ row }) => formatDateFunction(row.original.created_on),
      filterFn: dateFilterFunction,
      sortingFn: 'datetime',
    },
    { accessorKey: 'user_ip_address', header: 'IP Address' },
    { accessorKey: 'status', header: 'Status' },
    {
      accessorKey: 'downloadLink',
      header: 'Download',

      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Button
            size={'icon'}
            variant={'ghost'}
            onClick={() => {
              setSelectedReqId(row.original.narration_id);
              setOpenDialog(true);
            }}
            disabled={row.original.status === 'Processing'}
            className="disabled:opacity-20"
          >
            <DownloadIcon className="h-6 w-6"></DownloadIcon>
          </Button>
        </div>
      ),
    },
  ];

  // Rendering request history table and file download dialog
  return (
    <div>
      <RequestHistoryTable
        columns={RequestColumns}
        data={data}
      ></RequestHistoryTable>
      <DownloadFileDialog
        requestId={selectedReqId}
        open={openDialog}
        setOpen={handleDialogClose}
      ></DownloadFileDialog>
    </div>
  );
};

export default RequestHistoryColumns;
