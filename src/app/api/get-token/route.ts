import { AUTH_COOKIE } from '@/constants';
import { NextRequest } from 'next/server';

// route handler that will return the auth cookie token value when called from client components
export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE);
  return Response.json(authCookie ? authCookie.value : '');
}
