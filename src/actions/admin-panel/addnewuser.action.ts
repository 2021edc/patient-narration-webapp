'use server';

import { API_METHODS, CACHE_TAGS } from '@/constants';
import makeApiRequest from '@/services/makeApiRequest';
import { IAddNewUserFormState } from '@/types';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import {
  api_admin_add_user,
  api_admin_add_user_role,
} from '@/utils/url-helper';
import { z } from 'zod';
import { IAdminUserInfo } from '@/types/api/admin';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';

const validationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Name is required' })
      .trim()
      .refine((value) => value.replace(/\s+/g, '') === value, {
        message: 'Spaces not allowed',
      }),
    email: z.string().email().min(6, { message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'Minimum 8 characters' })
      // TODO check the exact password validation requirement for the backend
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$/,
        {
          message:
            'Password must include lowercase, uppercase, number, and special character',
        }
      ),
    confirmpassword: z.string().min(8, { message: 'Minimum 8 characters' }),
    userrole: z.string().min(1, { message: 'Role is required' }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: `Passwords don't match`,
    path: ['confirmpassword'],
  });

const AddNewUserAction = async (
  formState: IAddNewUserFormState,
  formData: FormData
): Promise<IAddNewUserFormState> => {
  // validating if the role has been selected
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  // return validation errors to the UI
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // redirect to login if auth token is not present
  const authToken = getTokenServerSide();
  if (!authToken) {
    redirect('/login');
  }

  // Api call to create the user
  const { name, email, userrole, password } = validation.data;
  const {
    data: newUserData,
    error: newUserError,
    statusCode: newUserStatusCode,
  } = (await makeApiRequest(
    api_admin_add_user(),
    API_METHODS.POST,
    { name, email, password, is_active: true },
    authToken
  )) as { data: IAdminUserInfo; error: string | undefined; statusCode: number };

  // Return any error from the API to UI
  if (newUserError) {
    return {
      success: false,
      errors: {
        _form: [
          handleUnauthorizedStatusCode(newUserStatusCode) || newUserError,
        ],
        errorStatusCode: newUserStatusCode,
      },
    };
  }

  // Api call to assign role to the user
  const roleResponse = await makeApiRequest(
    api_admin_add_user_role(),
    API_METHODS.POST,
    { user_id: newUserData.id, role_id: userrole, is_active: true },
    authToken
  );

  // Return any error from the API to UI
  if (roleResponse.error) {
    handleUnauthorizedStatusCode(roleResponse.statusCode);
    return {
      success: false,
      errors: {
        _form: [roleResponse.error],
        errorStatusCode: roleResponse.statusCode,
      },
    };
  }

  // Revalidating cache tag to fetch the latest list of users, after a new user is added.
  revalidateTag(CACHE_TAGS.ADMIN_USER_LIST);
  return { success: true, errors: {} };
};

export default AddNewUserAction;
