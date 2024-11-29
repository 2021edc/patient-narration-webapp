'use server';

import { AUTH_COOKIE, COOKIE_EXPIRY, USER_ROLE_COOKIE } from '@/constants';
import { ISigninResponse } from '@/types/api/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const SetCookieAction = async (data: ISigninResponse | undefined) => {
  // save the data received during signin workflow as cookies
  if (data) {
    // Set token in secure auth cookie
    cookies().set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: COOKIE_EXPIRY,
    });

    const userData = {
      email: data.email,
      user_role: data.user_role[0],
    };

    // set signed in user email and role in a secure cookie
    cookies().set({
      name: USER_ROLE_COOKIE,
      value: JSON.stringify(userData),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: COOKIE_EXPIRY,
    });

    revalidatePath('/');
    return { cookiesSaved: true };
  }
  return { cookiesSaved: false };
};

export default SetCookieAction;
