import PageHeader from '@/atoms/PageHeader';
import UserManagement from '@/components/admin-dashboard/user-management/UserManagement';
import { Suspense } from 'react';
import LoadingBars from '@/atoms/LoadingBars';

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'User Management'}></PageHeader>
      <div className="max-w-[1440px] mx-auto">
        <Suspense fallback={<LoadingBars className="my-16"></LoadingBars>}>
          <UserManagement />
        </Suspense>
      </div>
    </div>
  );
};

export default UserManagementPage;
