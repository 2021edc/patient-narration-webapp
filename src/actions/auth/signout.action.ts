'use server';

import { API_METHODS, AUTH_COOKIE, USER_ROLE_COOKIE } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import makeApiRequest from '@/services/makeApiRequest';
import { api_logout_url } from '@/utils/url-helper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signoutAction = async () => {
  //  make api call to sign out the user

  const { error } = await makeApiRequest(
    api_logout_url(),
    API_METHODS.DELETE,
    {},
    getTokenServerSide()
  );

  // delete cookies set during signin

  cookies().delete(AUTH_COOKIE);
  cookies().delete(USER_ROLE_COOKIE);

  if (error) {
    console.error(error);
  }

  // redirect to login page
  redirect('/login');
};

export default signoutAction;
