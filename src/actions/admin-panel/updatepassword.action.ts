'use server';

import { IUpdatePasswordFormState } from '@/types';
import { z } from 'zod';

const validationSchema = z
  .object({
    password: z.string().min(8, { message: 'Minimum 8 characters' }),
    confirmpassword: z.string().min(8, { message: 'Minimum 8 characters' }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: `Passwords don't match`,
    path: ['confirmpassword'],
  });

const UpdatePasswordAction = async (
  fullname: string,
  formState: IUpdatePasswordFormState,
  formData: FormData
): Promise<IUpdatePasswordFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  // TODO Make api backend call to update the password.

  return { success: true, errors: {}, data: { fullname } };
};

export default UpdatePasswordAction;
