import PageHeader from '@/atoms/PageHeader';
import { ListBulletIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

// Admin dashboard page with links to other pages only admins can access
const AdminDashboardPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'Admin Dashboard'}></PageHeader>
      <section className="max-w-[1440px] w-full">
        <ul className="list-none grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 md:w-full mx-auto">
          <li className="px-6 py-6 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
            <Link href={'/admin/user-management'}>
              <div className="flex gap-4 items-center py-6 px-12">
                <PersonIcon className="h-8 w-8 text-light-gray"></PersonIcon>
                <p className="text-xl font-semibold">User Management</p>
              </div>
            </Link>
          </li>
          <li className="px-6 py-6 shadow-lg text-gray-800 hover:bg-[#e5eaf0] rounded-lg flex flex-col items-center justify-center border">
            <Link href={'/admin/request-history'}>
              <div className="flex gap-4 items-center py-6 px-12">
                <ListBulletIcon className="h-8 w-8 text-light-gray"></ListBulletIcon>
                <p className="text-xl font-semibold">Request History</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
