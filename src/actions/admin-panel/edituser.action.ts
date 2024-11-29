'use server';

import { API_METHODS, CACHE_TAGS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import makeApiRequest from '@/services/makeApiRequest';
import { IEditUserFormState } from '@/types';
import { api_admin_update_user_role } from '@/utils/url-helper';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const validationSchema = z.object({
  userrole: z.string().min(1, { message: 'Role is required' }),
});

const EditUserAction = async (
  userId: string,
  formState: IEditUserFormState,
  formData: FormData
): Promise<IEditUserFormState> => {
  // Validating the form data and return errors to the UI if validation fails
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  const { userrole } = validation.data;

  const authToken = getTokenServerSide();
  if (!authToken) {
    redirect('/login');
  }

  // make api request with new user role id and user id

  const { data, error, statusCode } = await makeApiRequest(
    api_admin_update_user_role(),
    API_METHODS.POST,
    { user_id: userId, role_id: userrole },
    authToken
  );

  // return api errors if any to the UI
  if (error) {
    return {
      success: false,
      errors: { _form: [handleUnauthorizedStatusCode(statusCode) || error] },
      data,
    };
  }
  // refreshing the users list data
  revalidateTag(CACHE_TAGS.ADMIN_USER_LIST);
  return { success: true, errors: {}, data };
};

export default EditUserAction;
