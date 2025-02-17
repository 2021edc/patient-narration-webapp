'use client';

import ColumnSortButton from '@/atoms/ColumnSortButton';
import { IRequestDetailFormatted } from '@/types/api/request-history';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import RequestHistoryTable from './RequestTable';
import { Button } from '@/components/ui/button';
import DownloadFileDialog from './DownloadFileDialog';
import { useCallback, useState } from 'react';
import { REQUEST_STATUS } from '@/constants';
import { DateRange } from 'react-day-picker';
import { endOfDay, isWithinInterval, parseISO, startOfDay } from 'date-fns';

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

  const formatUTCDate = useCallback((utcDateString: string) => {
    const timestampWithUTC = utcDateString.endsWith('Z')
      ? utcDateString
      : `${utcDateString}Z`;
    const date = parseISO(timestampWithUTC);
    return date;
  }, []);

  const isDateWithinRange = useCallback(
    (
      row: Row<IRequestDetailFormatted>,
      columnId: string,
      filterValue: DateRange | undefined
    ) => {
      if (!filterValue) return true;
      const cellDateValue = row.original.created_on;
      const cellDate = formatUTCDate(cellDateValue);

      const { from, to } = filterValue;
      if ((from || to) && !cellDate) return false;
      if (from && to) {
        return isWithinInterval(cellDate, {
          start: startOfDay(from),
          end: endOfDay(to),
        });
      } else return true;
    },
    [formatUTCDate]
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
    { accessorKey: 'created_by', header: 'Created By' },
    {
      accessorKey: 'created_on',
      header: ({ column }) => (
        <ColumnSortButton
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          title={'Created'}
          isSorting={column.getIsSorted()}
        ></ColumnSortButton>
      ),
      cell: ({ row }) => (
        <p className="uppercase" suppressHydrationWarning>
          {formatUTCDate(row.original.created_on).toLocaleString()}
        </p>
      ),
      filterFn: isDateWithinRange,
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'modified_on',
      header: ({ column }) => (
        <ColumnSortButton
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          title={'Completed'}
          isSorting={column.getIsSorted()}
        ></ColumnSortButton>
      ),
      cell: ({ row }) =>
        row.original.status.toLowerCase() !== 'processing' ? (
          <p className="uppercase" suppressHydrationWarning>
            {formatUTCDate(row.original.modified_on).toLocaleString()}
          </p>
        ) : (
          <p>-</p>
        ),
      filterFn: isDateWithinRange,
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
            disabled={row.original.status !== REQUEST_STATUS.COMPLETED}
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
