import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE, USER_ROLE_COOKIE, USER_ROLES } from './constants';
import { IStoredUserInfo } from './types/api/auth';

const signinPagePath = '/login';

export const middleware = (request: NextRequest) => {
  // Check presence of auth cookie, redirect to login if cookie not present
  const authCookie = cookies().get(AUTH_COOKIE);
  if (!authCookie) {
    return NextResponse.redirect(new URL(signinPagePath, request.nextUrl));
  }

  // Role based route protection for 'Admin' pages.
  const roleCookie = cookies().get(USER_ROLE_COOKIE);
  if (roleCookie) {
    const roleData: IStoredUserInfo = JSON.parse(roleCookie.value);
    const nextPath = request.nextUrl.pathname;
    if (
      nextPath.startsWith('/admin') &&
      roleData.user_role !== USER_ROLES.ADMIN
    ) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }
};

// Middleware configured to run on all urls except login, NextJs urls and API calls
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
