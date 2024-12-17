import React from 'react';
import PageHeader from '@/atoms/PageHeader';
import RequestHistory from '@/components/admin-dashboard/request-history/RequestHistory';
import ScrollToTop from '@/atoms/ScrollToTop';

const RequestsPage = async (props: {
  searchParams?: Promise<{ page?: string; limit?: string }>;
}) => {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen flex flex-col items-center">
      <PageHeader pageTitle={'Request History'}></PageHeader>
      <div className="max-w-[1440px] mx-auto p-4 w-full">
        <RequestHistory searchParams={searchParams}></RequestHistory>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default RequestsPage;
