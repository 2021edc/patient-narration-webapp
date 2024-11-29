import ErrorText from '@/atoms/ErrorText';
import Paginate from '@/atoms/Paginate';
import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import makeApiRequest from '@/services/makeApiRequest';
import { api_get_requests_total } from '@/utils/url-helper';
import { redirect } from 'next/navigation';

interface RequestPaginationProps {
  searchParams:
    | {
        page?: string;
        limit?: string;
      }
    | undefined;
  pageSize: number;
  page: number;
}

const RequestPagination = async ({
  searchParams,
  page,
  pageSize,
}: RequestPaginationProps) => {
  // get authentication token from the cookie.
  const token = getTokenServerSide();
  if (!token) {
    redirect('/login');
  }

  // get total no of requests from backend, used to create and render pagination links.
  const {
    data: totalData,
    error: totalError,
    statusCode: totalStatusCode,
  } = (await makeApiRequest(
    api_get_requests_total(),
    API_METHODS.GET,
    {},
    token,
    undefined,
    true
  )) as { data: number; error: string; statusCode: number };

  return (
    <>
      <Paginate
        searchParams={searchParams}
        totalCount={totalData}
        pageSize={pageSize}
        page={page}
      ></Paginate>
      {totalError && (
        <ErrorText
          className="text-xs max-w-60 text-ellipsis text-nowrap overflow-hidden"
          message={handleUnauthorizedStatusCode(totalStatusCode) || totalError}
        />
      )}
    </>
  );
};

export default RequestPagination;
