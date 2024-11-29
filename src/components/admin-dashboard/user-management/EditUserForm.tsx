'use client';

import { IEditUserFormState } from '@/types';
import React, { useEffect } from 'react';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import EditUserAction from '@/actions/admin-panel/edituser.action';
import FormInput from '@/atoms/formelements/FormInput';
import { IAdminUserInfo } from '@/types/api/admin';
import { useUserRoleData } from '@/context/UserRoleContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EditUserFormProps {
  userInfo: IAdminUserInfo;
}

// component that renders a form to update user role

const EditUserForm = ({ userInfo }: EditUserFormProps) => {
  const { roles } = useUserRoleData();
  const initialState: IEditUserFormState = { success: false, errors: {} };
  const bindedAction = EditUserAction.bind(null, userInfo.user_id);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      toast.success('Role updated successfully');
    }
  }, [formState.success, formState.data]);

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
          id="name"
          name="name"
          label="Name"
          inputClassName="disabled:opacity-60"
          inputElementProps={{
            type: 'text',
            autoComplete: 'off',
            defaultValue: userInfo.user_name,
            disabled: true,
            readOnly: true,
          }}
        ></FormInput>
        <div className="w-full mb-1">
          <label className="text-light-gray mb-2`" htmlFor={''}>
            User Role
          </label>
          <Select name="userrole" defaultValue={userInfo.role_id}>
            <SelectTrigger className="w-full !h-11 bg-white text-black">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent id="userrole" className="bg-white text-black">
              <SelectGroup>
                {roles.map((option) => (
                  <SelectItem value={option.id} key={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="mb-2 text-red-800 dark:text-red-500 text-xs min-h-2">
            {formState.errors.userrole?.join(',')}
          </p>
        </div>

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
