import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import UserManagement from '@/components/admin-dashboard/user-management/UserManagement';
import RequestHistory from '@/components/admin-dashboard/request-history/RequestHistory';
import { ADMIN_DASHBOARD_TABS } from '@/constants';
import PageHeader from '@/atoms/PageHeader';

const AdminDashboardPage = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col items-center dark:text-light-text">
      <PageHeader pageTitle={'Admin Dashboard'}></PageHeader>
      <section className="max-w-[1440px] w-full">
        <Tabs
          defaultValue={ADMIN_DASHBOARD_TABS.USER_MANAGEMENT}
          className="w-full p-4"
        >
          <TabsList className="grid w-full grid-cols-2 h-14">
            <TabsTrigger
              value={ADMIN_DASHBOARD_TABS.USER_MANAGEMENT}
              className="w-full h-12"
            >
              {ADMIN_DASHBOARD_TABS.USER_MANAGEMENT}
            </TabsTrigger>
            <TabsTrigger
              value={ADMIN_DASHBOARD_TABS.REQUEST_HISTORY}
              className="w-full h-12"
            >
              {ADMIN_DASHBOARD_TABS.REQUEST_HISTORY}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ADMIN_DASHBOARD_TABS.USER_MANAGEMENT}>
            <UserManagement />
          </TabsContent>
          <TabsContent value={ADMIN_DASHBOARD_TABS.REQUEST_HISTORY}>
            <RequestHistory />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
