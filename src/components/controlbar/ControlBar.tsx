import { cookies } from 'next/headers';
import UserMenu from './UserMenu';
import { AUTH_COOKIE } from '@/constants';
import Link from 'next/link';

const ControlBar = () => {
  const isLoggedIn = !!cookies().get(AUTH_COOKIE)?.value;

  return (
    <nav className="px-4 py-2 flex items-center justify-between bg-light-text dark:bg-transparent">
      <Link href={'/'}>
        <h2 className="text-l lg:text-xl font-semibold text-dark-gray dark:text-light-text">
          Patient Narration Assistant
        </h2>
      </Link>

      <div className="flex gap-4 items-center">
        {isLoggedIn && <UserMenu></UserMenu>}
      </div>
    </nav>
  );
};

export default ControlBar;
