'use server';

import { AUTH_COOKIE, USER_ROLE_COOKIE } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signoutAction = async () => {
  // Delete cookies set during login when the user signs out and redirect to login
  cookies().delete(AUTH_COOKIE);
  cookies().delete(USER_ROLE_COOKIE);
  redirect('/login');
};

export default signoutAction;
