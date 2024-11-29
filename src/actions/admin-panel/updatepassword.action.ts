'use server';

import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import makeApiRequest from '@/services/makeApiRequest';
import { IUpdatePasswordFormState } from '@/types';
import { api_admin_update_user_password } from '@/utils/url-helper';
import { redirect } from 'next/navigation';

const UpdatePasswordAction = async (
  user_id: string
): Promise<IUpdatePasswordFormState> => {
  // return error if user id is not provided.
  if (!user_id) return { success: false, errors: { _form: ['User is null'] } };

  // Check for auth token, if not present redirect to login
  const authToken = getTokenServerSide();
  if (!authToken) {
    redirect('/login');
  }

  // make api call to generate new password for the user id
  const { data, error, statusCode } = await makeApiRequest(
    api_admin_update_user_password(),
    API_METHODS.PUT,
    { user_id },
    authToken
  );

  // Return API errors to the UI
  if (error) {
    return {
      success: false,
      errors: {
        _form: [handleUnauthorizedStatusCode(statusCode) || error],
        errorStatusCode: statusCode,
      },
    };
  }

  // Return the new generated password to be displayed in the UI
  return {
    success: true,
    errors: {},
    data: { newPassword: data.updated_password },
  };
};

export default UpdatePasswordAction;
