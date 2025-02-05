import { ISubjectData } from '@/types/api/narration';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from '../ui/table';
import { memo } from 'react';

const TABLE_HEADERS = ['Subject ID', 'Site'];

// component renders table to display selected subjects data in the UI

interface SelectedSubjectsTableProps {
  subjectData: ISubjectData[];
  selectedSubjectIds: string[];
}

const SelectedSubjectsTable = ({
  subjectData,
  selectedSubjectIds,
}: SelectedSubjectsTableProps) => {
  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold text-gray-500 my-4">
        Selected Subject Details
      </h2>
      <div className="max-h-[60vh] relative overflow-auto">
        <Table>
          <TableHeader className="text-lg bg-dark-gray">
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableHead
                  className="font-bold text-center text-white"
                  key={header}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {selectedSubjectIds.map((subjectId) => {
              const data = subjectData.find(
                (item) => item.subject === subjectId
              );
              return (
                <TableRow key={data?.subject} className="text-center">
                  <TableCell className="!py-6">
                    {data?.subject.trim()}
                  </TableCell>
                  <TableCell>{data?.site}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default memo(SelectedSubjectsTable);
