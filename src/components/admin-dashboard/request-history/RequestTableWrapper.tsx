import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import makeApiRequest from '@/services/makeApiRequest';
import { api_get_requests_history } from '@/utils/url-helper';
import { redirect } from 'next/navigation';
import RequestHistoryColumns from './requests-table/RequestHistoryColumns';
import ErrorText from '@/atoms/ErrorText';
import { IRequestDetail } from '@/types/api/request-history';
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
    token,
    undefined,
    true
  )) as { data: IRequestDetail[]; error: string; statusCode: number };
  return (
    <>
      {data && <RequestHistoryColumns data={data}></RequestHistoryColumns>}
      {error && (
        <ErrorText
          message={handleUnauthorizedStatusCode(statusCode) || error}
        />
      )}
    </>
  );
};

export default RequestTableWrapper;
