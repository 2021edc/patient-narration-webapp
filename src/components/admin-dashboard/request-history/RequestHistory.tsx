import SelectPageSizeLimit from '@/atoms/SelectPageSizeLimit';
import {
  API_METHODS,
  PREFERENCE_COOKIES,
  REQUEST_HISTORY_PAGESIZES,
} from '@/constants';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import LoadingBars from '@/atoms/LoadingBars';
import RequestTableWrapper from './RequestTableWrapper';
import makeApiRequest from '@/services/makeApiRequest';
import { api_get_requests_total } from '@/utils/url-helper';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import { redirect } from 'next/navigation';
import Paginate from '@/atoms/Paginate';

interface RequestHistoryProps {
  searchParams:
    | {
        page?: string;
      }
    | undefined;
}

// component renders pagination, fetches data for current page and renders the table

const RequestHistory = async ({ searchParams }: RequestHistoryProps) => {
  // check and get page size preference if saved in a cookie, otherwise defaults to first of page size options(20)
  const storedPageSizeCookie = cookies().get(PREFERENCE_COOKIES.PAGE_SIZE);
  let pageSize = REQUEST_HISTORY_PAGESIZES[0];
  if (storedPageSizeCookie) {
    pageSize = Number(storedPageSizeCookie.value);
  }

  const token = getTokenServerSide();
  if (!token) {
    redirect('/login');
  }

  // get total no of requests from backend, used to create and render pagination links.

  const { data: totalData } = (await makeApiRequest(
    api_get_requests_total(),
    API_METHODS.GET,
    {},
    token
  )) as { data: number; error: string; statusCode: number };

  // get page number for search params if available, else default to page 1
  const page = Number(searchParams?.page || '1');
  const totalPages = totalData > 0 ? Math.ceil(totalData / pageSize) : 1;

  // render pagination, page size selection and request table components
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 py-4 sticky top-0 bg-white z-50">
        <SelectPageSizeLimit
          cookie_key={PREFERENCE_COOKIES.PAGE_SIZE}
          selectOptions={REQUEST_HISTORY_PAGESIZES}
          pageSize={String(pageSize)}
        ></SelectPageSizeLimit>

        <Paginate totalPages={totalPages}></Paginate>
      </div>

      <Suspense
        fallback={<LoadingBars className="my-20 mx-auto"></LoadingBars>}
        key={page}
      >
        <RequestTableWrapper
          page={page}
          pageSize={pageSize}
        ></RequestTableWrapper>
      </Suspense>
    </div>
  );
};

export default RequestHistory;
