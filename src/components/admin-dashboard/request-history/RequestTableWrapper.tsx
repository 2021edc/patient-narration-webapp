import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import makeApiRequest from '@/services/makeApiRequest';
import { api_get_requests_history } from '@/utils/url-helper';
import { redirect } from 'next/navigation';
import RequestHistoryColumns from './requests-table/RequestHistoryColumns';
import ErrorText from '@/atoms/ErrorText';
import {
  IRequestDetail,
  IRequestDetailFormatted,
} from '@/types/api/request-history';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';

interface RequestTableWrapperProps {
  page: number;
  pageSize: number;
}

const RequestTableWrapper = async ({
  page,
  pageSize,
}: RequestTableWrapperProps) => {
  // get authentication token from the cookie.
  const token = getTokenServerSide();
  if (!token) {
    redirect('/login');
  }

  // fetch requests list for the current page and page limit
  const { data, error, statusCode } = (await makeApiRequest(
    api_get_requests_history(page, pageSize),
    API_METHODS.GET,
    {},
    token
  )) as { data: IRequestDetail[]; error: string; statusCode: number };

  // joining array of sites and subjects to string
  let formattedData: IRequestDetailFormatted[] = [];
  if (data) {
    formattedData = data.map((requestItem) => ({
      ...requestItem,
      narration_sites: requestItem.narration_sites.join(', '),
      narration_subjects: requestItem.narration_subjects.join(', '),
    }));
  }
  return (
    <>
      {data && (
        <RequestHistoryColumns data={formattedData}></RequestHistoryColumns>
      )}
      {error && (
        <ErrorText
          message={handleUnauthorizedStatusCode(statusCode) || error}
        />
      )}
    </>
  );
};

export default RequestTableWrapper;
