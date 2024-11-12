import PageHeader from '@/atoms/PageHeader';
import { ListBulletIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const AdminDashboardPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'Admin Dashboard'}></PageHeader>
      <section className="max-w-[1440px] w-full">
        <ul className="list-none flex gap-4">
          <li className="border-2 rounded-md shadow-lg">
            <Link href={'/admin/user-management'}>
              {' '}
              <div className="flex gap-4 items-center py-6 px-12">
                <PersonIcon className="h-8 w-8 text-light-gray"></PersonIcon>
                <p className="text-xl font-semibold">User Management</p>
              </div>
            </Link>
          </li>
          <li className="border-2 rounded-md  shadow-lg">
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
