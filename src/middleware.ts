import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE, USER_ROLE_COOKIE } from './constants';

const signinPagePath = '/login';

export const middleware = (request: NextRequest) => {
  // Check presence of auth cookie, redirect to login if cookie not present
  const authCookie = cookies().get(AUTH_COOKIE);
  if (!authCookie) {
    return NextResponse.redirect(new URL(signinPagePath, request.nextUrl));
  }

  // Role based route protection for 'Admin' pages.
  const role = cookies().get(USER_ROLE_COOKIE)?.value;
  const nextPath = request.nextUrl.pathname;
  if (nextPath.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
};

// Middleware configured to run on all urls except login, NextJs urls and API calls
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
