import { cookies } from 'next/headers';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '../ui/menubar';
import { AUTH_COOKIE, USER_ROLE_COOKIE, USER_ROLES } from '@/constants';
import LogoutForm from './LogoutForm';
import Link from 'next/link';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const UserMenu = () => {
  const isAdmin = cookies().get(USER_ROLE_COOKIE)?.value === USER_ROLES.ADMIN;

  // TODO User email to be obtained from API during API integration
  const userEmail = cookies().get(AUTH_COOKIE)?.value;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex items-center gap-4">
            <p>{userEmail}</p>
            <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
          </div>
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem
            className="border-b py-2 dark:border-b-light-gray"
            asChild
          >
            <Link href="/narrative">Patient Narration</Link>
          </MenubarItem>
          {isAdmin && (
            <MenubarItem
              className="border-b py-2 dark:border-b-light-gray"
              asChild
            >
              <Link href="/admin/admin-panel">Admin Panel</Link>
            </MenubarItem>
          )}

          <div>
            <LogoutForm />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
