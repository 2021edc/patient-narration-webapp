import { cookies } from 'next/headers';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from '../ui/menubar';
import { USER_ROLE_COOKIE, USER_ROLES } from '@/constants';
import LogoutForm from './LogoutForm';
import Link from 'next/link';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { IStoredUserInfo } from '@/types/api/auth';

// component renders navigation menu with items depending upon user access level

const UserMenu = () => {
  const userDataCookie = cookies().get(USER_ROLE_COOKIE);
  let isAdmin;
  let userEmail;
  if (userDataCookie) {
    const userData: IStoredUserInfo = JSON.parse(userDataCookie?.value);
    isAdmin = userData.user_role === USER_ROLES.ADMIN;
    userEmail = userData.email;
  }

  return (
    <Menubar className="bg-white">
      <MenubarMenu>
        <MenubarTrigger className="bg-white w-[8rem] md:w-[14rem]">
          <div className="flex items-center gap-4">
            <p className="w-[5rem] md:w-[10rem] text-nowrap text-ellipsis overflow-hidden">
              {userEmail}
            </p>
            <ChevronDownIcon className="h-4 w-4"></ChevronDownIcon>
          </div>
        </MenubarTrigger>

        <MenubarContent className="bg-white !w-[14rem] z-50">
          <MenubarItem
            className="border-b py-2 dark:border-b-light-gray"
            asChild
          >
            <Link href="/narration-generation">Narration Generation</Link>
          </MenubarItem>
          <MenubarItem
            className="border-b py-2 dark:border-b-light-gray"
            asChild
          >
            <Link href="/requests?page=1">Requests History</Link>
          </MenubarItem>
          {isAdmin && (
            <MenubarItem
              className="border-b py-2 dark:border-b-light-gray"
              asChild
            >
              <Link href="/admin">Admin Dashboard</Link>
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
