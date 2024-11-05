import RequestTable from './RequestTable';

// TODO get request history from API and remove this constant value
const SAMPLE_REQUEST = [
  {
    id: 'PNXX001-2024',
    description:
      'File Name: 5_subjects_Raw data.xlsx \n Subjects: 5001, 5011, 5005, 5006',
    dateRequested: '13/10/2024',
    status: 'Complete',
    requestedBy: 'admin1234',
    module: 'Patient Narration',
    downloadLink: 'Link',
  },
];

const RequestHistory = () => {
  return <RequestTable requests={SAMPLE_REQUEST} />;
};

export default RequestHistory;
