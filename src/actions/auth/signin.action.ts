'use server';

import { API_METHODS } from '@/constants';
import makeApiRequest from '@/services/makeApiRequest';
import { ISigninFormState } from '@/types';
import { ISigninResponse } from '@/types/api/auth';
import { api_login_url } from '@/utils/url-helper';
import { z } from 'zod';
import SetCookieAction from './setcookie.action';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const signinAction = async (
  formState: ISigninFormState,
  formData: FormData
): Promise<ISigninFormState> => {
  // Define zod validation schema for the form data
  const validationSchema = z.object({
    email: z.string().email().min(6, { message: 'Please enter valid e-mail' }),
    password: z
      .string()
      .min(6, { message: 'Password - at least 6 characters' }),
  });

  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // return field errors if validation fails
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // make api call to get auth token and user info.
  const { error, data } = (await makeApiRequest(
    api_login_url(),
    API_METHODS.POST,
    {
      ...validation.data,
    }
  )) as { error: string; data: ISigninResponse };

  // return api error to the UI
  if (error) {
    return { success: false, errors: { _form: [error] } };
  }

  // if no active session, save the token and user info in secure cookies
  if (data.is_active_session) {
    return { success: false, isActiveSession: data.is_active_session, data };
  }
  // else indicate an active session to the UI

  await SetCookieAction(data);
  revalidatePath('/');
  redirect('/');
};

export default signinAction;
