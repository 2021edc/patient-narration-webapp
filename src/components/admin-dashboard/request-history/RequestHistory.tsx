'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RequestsPagination from './pagination/RequestsPagination';
import { request_history_columns } from './requests-table/RequestColumns';
import RequestTable from './requests-table/RequestTable';
import { data_request_history } from '@/data/request-history.data';
import { useCallback } from 'react';
import SelectPageSizeLimit from './pagination/SlelectPageSizeLimit';
import { REQUEST_HISTORY_PAGESIZES } from '@/constants';

// TODO static request history should be replaced with value from api
// TODO get total records count from backend API.

const RequestHistory = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('limit') || '15');

  //TODO Data should be fetched from the backend API
  const paginatedResults = data_request_history.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      const limitkey = 'limit';
      const pagekey = 'page';
      const newSearchParams = new URLSearchParams(searchParams || undefined);
      newSearchParams.set(limitkey, String(newPageSize));
      newSearchParams.set(pagekey, '1');
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, pathname, router]
  );
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <SelectPageSizeLimit
          selectOptions={REQUEST_HISTORY_PAGESIZES}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
        ></SelectPageSizeLimit>
        <RequestsPagination
          totalCount={data_request_history.length}
          pageSize={pageSize}
          page={page}
        ></RequestsPagination>
      </div>

      <RequestTable columns={request_history_columns} data={paginatedResults} />
    </>
  );
};

export default RequestHistory;
