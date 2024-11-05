'use server';

import { AUTH_COOKIE, USER_ROLE_COOKIE } from '@/constants';
import { ISigninFormState } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const signinAction = async (
  formState: ISigninFormState,
  formData: FormData
): Promise<ISigninFormState> => {
  // Define zod validation schema for the form data
  const validationSchema = z.object({
    email: z.string().email().min(6, { message: 'Please enter valid e-mail' }),
    password: z.string().min(6, { message: 'Please enter valid password' }),
  });

  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // return field errors if validation fails
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // TODO : Make API call to the backend with the email and password
  // Store the JWT returned in response in a secure httponly cookie

  // This code is to be modified during API integration
  cookies().set(AUTH_COOKIE, validation.data.email, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24, //cookie expiry set to 1 day
  });

  const isAdmin = validation.data.email === 'admin@merillife.com';

  cookies().set(USER_ROLE_COOKIE, isAdmin ? 'admin' : 'user', {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, //cookie expiry set to 1 day
  });
  revalidatePath('/');
  return { success: true, errors: {} };
};

export default signinAction;
