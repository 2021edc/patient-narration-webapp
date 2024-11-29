'use server';

import { API_METHODS, CACHE_TAGS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import makeApiRequest from '@/services/makeApiRequest';
import {
  api_admin_activate_user,
  api_admin_deactivate_user,
} from '@/utils/url-helper';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const ActivateUserAction = async ({
  userid,
  activate,
}: {
  userid: string;
  activate: boolean;
}) => {
  // If token is not present, redirecting to login page
  const token = getTokenServerSide();
  if (!token) {
    redirect('/login');
  }

  // Making API call to activatre/deactivate the user
  const { data, error, statusCode } = await makeApiRequest(
    activate ? api_admin_activate_user() : api_admin_deactivate_user(),
    API_METHODS.PUT,
    {
      id: userid,
    },
    token
  );
  revalidateTag(CACHE_TAGS.ADMIN_USER_LIST);

  if (data) {
    return { success: true, message: data.message };
  }
  if (error) {
    return {
      success: false,
      error: handleUnauthorizedStatusCode(statusCode) || error,
      statusCode,
    };
  }
};

export default ActivateUserAction;
