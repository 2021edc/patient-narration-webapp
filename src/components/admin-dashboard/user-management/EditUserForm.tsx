'use client';

import { IEditUserFormState, IUserInfo } from '@/types';
import React, { useEffect } from 'react';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { LS_KEY_USERSLIST, USER_ROLES_OPTIONS } from '@/constants';
import { useFormState } from 'react-dom';
import { readFromLocal, writeToLocal } from '@/lib/localstorageutils';
import { toast } from 'sonner';
import EditUserAction from '@/actions/admin-panel/edituser.action';
import FormInput from '@/atoms/formelements/FormInput';
import FormInputSelect from '@/atoms/formelements/FormInputSelect';

interface EditUserFormProps {
  userInfo: IUserInfo;
}

const EditUserForm = ({ userInfo }: EditUserFormProps) => {
  const initialState: IEditUserFormState = { success: false, errors: {} };
  const [formState, formAction] = useFormState(EditUserAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      const storedUsers: IUserInfo[] | null =
        readFromLocal(LS_KEY_USERSLIST) || null;

      if (storedUsers) {
        const userIndex = storedUsers.findIndex(
          (user) => user.email === userInfo.email
        );
        if (userIndex !== -1) {
          const oldUserData = storedUsers[userIndex];
          storedUsers[userIndex] = { ...oldUserData, ...formState.data };
          writeToLocal(LS_KEY_USERSLIST, storedUsers);
          toast.success('User details updated successfully');
        }
      }

      //TODO see if useRouter refresh() can be used during API integration

      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [formState.success, formState.data, userInfo.email]);

  return (
    <div className="my-4 p-4 border-2 rounded-lg">
      <h3 className="text-lg font-semibold pb-2 border-b-2">
        Update User Details
      </h3>
      <form className="p-2" action={formAction} autoComplete="off">
        <FormInput
          id="email"
          name="email"
          label="Email"
          inputClassName="disabled:opacity-60"
          inputElementProps={{
            type: 'email',
            autoComplete: 'off',
            disabled: true,
            readOnly: true,
            defaultValue: userInfo.email,
          }}
        ></FormInput>
        <FormInput
          id="fullname"
          name="fullname"
          label="Name"
          inputElementProps={{
            type: 'text',
            autoComplete: 'off',
            defaultValue: userInfo.fullname,
          }}
          errorMsg={formState.errors.fullname?.join(',')}
        ></FormInput>
        <FormInputSelect
          id="userrole"
          name="userrole"
          label="Role"
          optionsList={USER_ROLES_OPTIONS}
          errorMsg={formState.errors.userrole?.join(', ')}
          defaultValue={userInfo.userrole}
        ></FormInputSelect>

        <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
          {formState.errors._form?.join(',')}
        </p>

        <div className="flex items-center justify-end gap-2">
          <FormSubmit>Update</FormSubmit>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
