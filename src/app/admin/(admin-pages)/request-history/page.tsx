import PageHeader from '@/atoms/PageHeader';
import ScrollToTop from '@/atoms/ScrollToTop';
import RequestHistory from '@/components/admin-dashboard/request-history/RequestHistory';

const RequestHistoryPage = async (props: {
  searchParams?: Promise<{ page?: string; limit?: string }>;
}) => {
  // Getting page no and page size set in the page url
  const searchParams = await props.searchParams;
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'Request History'}></PageHeader>
      <div className="max-w-[1440px] mx-auto p-4 w-full">
        <RequestHistory searchParams={searchParams}></RequestHistory>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default RequestHistoryPage;
