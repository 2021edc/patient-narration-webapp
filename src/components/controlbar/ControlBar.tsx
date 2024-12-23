import { cookies } from 'next/headers';
import UserMenu from './UserMenu';
import { AUTH_COOKIE } from '@/constants';
import Link from 'next/link';
import MerilLogo from '@/atoms/MerilLogo';

const ControlBar = () => {
  const isLoggedIn = !!cookies().get(AUTH_COOKIE)?.value;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <nav className="px-4 py-2 flex items-center justify-between bg-light-text dark:bg-transparent shadow-md">
      <Link href={'/'}>
        <div className="py-1 px-1 lg:px-4 flex gap-2 lg:gap-6 items-center">
          <MerilLogo imageSize="h-[40px] w-[40px] lg:h-[60px] lg:w-[80px]"></MerilLogo>
          <h2 className="text-base lg:text-xl font-semibold text-dark-gray capitalize">
            {appName ? appName : 'Patient Narration'}
          </h2>
        </div>
      </Link>
      {/* show user menu only if user is logged in */}
      <div className="flex gap-4 items-center">
        {isLoggedIn && <UserMenu></UserMenu>}
      </div>
    </nav>
  );
};

export default ControlBar;
