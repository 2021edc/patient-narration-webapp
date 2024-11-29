'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const ChangePagesizeAction = async (
  cookie_name: string,
  newPageSize: string,
  pathName: string
) => {
  // Saving the page size preference as a cookie.

  try {
    cookies().set({
      name: cookie_name,
      value: newPageSize,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 * 3, // expirt set to 3 months
    });

    // When the page size changes, fetching new data for that page
    revalidatePath(pathName);
    return true;
  } catch {
    return false;
  }
};

export default ChangePagesizeAction;
