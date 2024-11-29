import { AUTH_COOKIE } from '@/constants';
import { cookies } from 'next/headers';

// helper function to get auth token from cookies. to be used in server actions and server components

export const getTokenServerSide = (): string | undefined => {
  const authCookie = cookies().get(AUTH_COOKIE);
  if (authCookie) {
    return authCookie.value;
  }
  return undefined;
};
