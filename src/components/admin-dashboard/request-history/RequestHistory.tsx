import SelectPageSizeLimit from '@/atoms/SelectPageSizeLimit';
import { PREFERENCE_COOKIES, REQUEST_HISTORY_PAGESIZES } from '@/constants';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import LoadingBars from '@/atoms/LoadingBars';
import RequestPagination from './RequestPagination';
import RequestTableWrapper from './RequestTableWrapper';

interface RequestHistoryProps {
  searchParams:
    | {
        page?: string;
        limit?: string;
      }
    | undefined;
}

// component renders pagination, fetches data for current page and renders the table

const RequestHistory = async ({ searchParams }: RequestHistoryProps) => {
  // check and get page size preference if saved in a cookie, otherwise defaults to first of page size options(20)
  const storedPageSizeCookie = cookies().get(PREFERENCE_COOKIES.PAGE_SIZE);
  let storedPageSize = REQUEST_HISTORY_PAGESIZES[0];
  if (storedPageSizeCookie) {
    storedPageSize = Number(storedPageSizeCookie.value);
  }

  // get page number for search params if available, else default to page 1
  const page = Number(searchParams?.page || '1');
  const pageSize = Number(storedPageSize);

  // render pagination, page size selection and request table components
  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 gap-4 mb-4 py-4 sticky top-0 bg-white">
        <div>
          <SelectPageSizeLimit
            cookie_key={PREFERENCE_COOKIES.PAGE_SIZE}
            selectOptions={REQUEST_HISTORY_PAGESIZES}
            pageSize={String(pageSize)}
          ></SelectPageSizeLimit>
        </div>

        <div className="w-full flex justify-start lg:justify-end">
          <Suspense fallback={<LoadingBars></LoadingBars>}>
            <RequestPagination
              pageSize={pageSize}
              page={page}
              searchParams={searchParams}
            ></RequestPagination>
          </Suspense>
        </div>
      </div>

      <Suspense
        fallback={<LoadingBars className="my-20 mx-auto"></LoadingBars>}
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
