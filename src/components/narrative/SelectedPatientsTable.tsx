import { ISubjectData } from '@/types/api/narration';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from '../ui/table';

const TABLE_HEADERS = [
  'Subject ID',
  'Site',
  'Date of Informed Consent',
  'Demographics',
];

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
    <div className="my-10 border rounded-md">
      <h2 className="text-xl font-semibold text-gray-500 my-4">
        Selected Subject Details
      </h2>
      <div className="max-h-[60vh] relative overflow-auto">
        <Table>
          <TableHeader className="text-lg sticky top-0 bg-white">
            <TableRow className="text-center">
              {TABLE_HEADERS.map((header) => (
                <TableHead className="font-bold" key={header}>
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
                <TableRow key={data?.subject} className="text-left">
                  <TableCell>{data?.subject.trim()}</TableCell>
                  <TableCell>{data?.site}</TableCell>
                  <TableCell>
                    {data?.consent_date
                      ? new Date(data?.consent_date).toLocaleDateString()
                      : 'NA'}
                  </TableCell>
                  <TableCell>{data?.demographics}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SelectedSubjectsTable;
