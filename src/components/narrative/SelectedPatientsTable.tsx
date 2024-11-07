import { IPatientData } from './NarrationInputs';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from '../ui/table';

const TABLE_HEADERS = [
  'Patient ID',
  'Site',
  'Date of Informed Consent',
  'Demographics',
];

interface SelectedPatientsTableProps {
  patientData: IPatientData[];
  selectedPatientIds: string[];
}

const SelectedPatientsTable = ({
  patientData,
  selectedPatientIds,
}: SelectedPatientsTableProps) => {
  return (
    <div className="my-10 border rounded-md">
      <h2 className="text-xl font-semibold text-gray-500 my-4">
        Selected Patient Details
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
            {selectedPatientIds.map((patientId) => {
              const data = patientData.find(
                (item) => item.patientId === patientId
              );
              return (
                <TableRow key={data?.patientId} className="text-left">
                  <TableCell>{data?.patientId.trim()}</TableCell>
                  <TableCell>{data?.site}</TableCell>
                  <TableCell>{data?.informedConsentDate.trim()}</TableCell>
                  <TableCell>{data?.demographics.join(', ').trim()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SelectedPatientsTable;
