'use server';

import { IAddNewUserFormState } from '@/types';
import { z } from 'zod';

const validationSchema = z
  .object({
    fullname: z
      .string()
      .min(6, { message: 'Name is required' })
      .trim()
      .refine((value) => value.replace(/\s+/g, '') === value, {
        message: 'Spaces not allowed',
      }),
    email: z.string().email().min(6, { message: 'Email is required' }),
    password: z.string().min(8, { message: 'Minimum 8 characters' }),
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
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  //TODO make api call to the backend to add user, during api integration

  const { fullname, email, userrole } = validation.data;
  return {
    success: true,
    data: {
      fullname,
      email,
      userrole,
      createdOn: new Date().toLocaleDateString(),
    },
    errors: {},
  };
};

export default AddNewUserAction;
