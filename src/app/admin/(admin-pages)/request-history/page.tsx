import PageHeader from '@/atoms/PageHeader';
import RequestHistory from '@/components/admin-dashboard/request-history/RequestHistory';

const RequestHistoryPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'Request History'}></PageHeader>
      <div className="max-w-[1440px] mx-auto p-4">
        <RequestHistory></RequestHistory>
      </div>
    </div>
  );
};

export default RequestHistoryPage;
