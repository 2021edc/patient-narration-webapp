import PageHeader from '@/atoms/PageHeader';
import UserManagement from '@/components/admin-dashboard/user-management/UserManagement';

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'User Management'}></PageHeader>
      <div className="max-w-[1440px] mx-auto">
        <UserManagement />
      </div>
    </div>
  );
};

export default UserManagementPage;
