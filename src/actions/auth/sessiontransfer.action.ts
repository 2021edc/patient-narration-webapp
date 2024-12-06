'use server';

import { API_METHODS } from '@/constants';
import makeApiRequest from '@/services/makeApiRequest';
import { ISessionTransferResponse, ISigninResponse } from '@/types/api/auth';
import { api_login_session_transfer } from '@/utils/url-helper';
import SetCookieAction from './setcookie.action';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const SessionTransferAction = async (signinData: ISigninResponse) => {
  // return false to UI if no signin data is provided
  if (!signinData) {
    return false;
  }

  // make API call with the last received token to get new token.
  const { data, error } = (await makeApiRequest(
    api_login_session_transfer(),
    API_METHODS.POST,
    { token: signinData.token }
  )) as { data: ISessionTransferResponse; error: string };

  // save the auth token and user info as secure cookies.
  if (data) {
    const { cookiesSaved } = await SetCookieAction({
      ...signinData,
      token: data.token,
    });
    if (!cookiesSaved) return false;
  }
  if (error) {
    return false;
  }
  revalidatePath('/');
  redirect('/');
};

export default SessionTransferAction;
