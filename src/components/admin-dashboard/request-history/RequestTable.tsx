import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';

interface Request {
  id: string;
  description: string;
  dateRequested: string;
  requestedBy: string;
  module: string;
  status: string;
  downloadLink: string;
}

interface RequestHistoryTableProps {
  requests: Request[];
}

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({
  requests,
}) => {
  return (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-4">ID</TableHead>
          <TableHead className="py-2 px-4" colSpan={3}>
            Description
          </TableHead>
          <TableHead className="py-2 px-4">Date Requested</TableHead>
          <TableHead className="py-2 px-4">Requested By</TableHead>
          <TableHead className="py-2 px-4">Module</TableHead>
          <TableHead className="py-2 px-4">Status</TableHead>
          <TableHead className="py-2 px-4">Download Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="py-2 px-4">{request.id}</TableCell>
            <TableCell className="py-2 px-4" colSpan={3}>
              <p>{request.description}</p>
            </TableCell>
            <TableCell className="py-2 px-4">{request.dateRequested}</TableCell>
            <TableCell className="py-2 px-4">{request.requestedBy}</TableCell>
            <TableCell className="py-2 px-4">{request.module}</TableCell>
            <TableCell
              className={`py-2 px-4 ${request.status === 'Complete' ? 'text-green-500' : 'text-red-500'}`}
            >
              {request.status}
            </TableCell>
            <TableCell className="py-2 px-4">
              <Link
                href={request.downloadLink}
                className="text-blue-500 underline"
              >
                File
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestHistoryTable;
