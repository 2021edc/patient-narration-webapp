'use client';

import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import FormSubmit from '@/atoms/formelements/FormSubmit';
import { LS_KEY_USERSLIST, USER_ROLES_OPTIONS } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useFormState } from 'react-dom';
import { IAddNewUserFormState } from '@/types';
import AddNewUserAction from '@/actions/admin-panel/addnewuser.action';
import { readFromLocal, writeToLocal } from '@/lib/localstorageutils';
import { toast } from 'sonner';
import FormInput from '@/atoms/formelements/FormInput';
import FormInputPassword from '@/atoms/formelements/FormInputPassword';
import FormInputSelect from '@/atoms/formelements/FormInputSelect';

const AddUserForm = () => {
  const [showDialog, setShowDialog] = useState(false);
  const initialState: IAddNewUserFormState = { success: false, errors: {} };
  const [formState, formAction] = useFormState(AddNewUserAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      const storedUsers = readFromLocal(LS_KEY_USERSLIST) || null;
      if (storedUsers)
        writeToLocal(LS_KEY_USERSLIST, [...storedUsers, formState.data]);
      else writeToLocal(LS_KEY_USERSLIST, [formState.data]);

      toast.success('User added successfully');

      //TODO see if useRouter refresh() can be used during API integration
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [formState.success, formState.data]);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className="flex gap-1 py-2 px-4 items-center dark:bg-gray-400 dark:hover:bg-gray-100 dark:text-black bg-gray-700 text-white rounded-md hover:bg-gray-600">
        <PlusIcon className="h-4 w-4 mr-2" />
        Add
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-dark-gray">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Add a new user and assign a role
          </DialogDescription>
        </DialogHeader>
        <form className="p-2" action={formAction} autoComplete="off">
          <FormInput
            id="fullname"
            name="fullname"
            label="Name"
            inputElementProps={{ type: 'text', autoComplete: 'off' }}
            errorMsg={formState.errors.fullname?.join(',')}
          ></FormInput>
          <FormInput
            id="email"
            name="email"
            label="Email"
            inputElementProps={{ type: 'email', autoComplete: 'off' }}
            errorMsg={formState.errors.email?.join(',')}
          ></FormInput>

          <FormInputPassword
            id="password"
            name="password"
            label="Password"
            inputElementProps={{ autoComplete: 'off' }}
            errorMsg={formState.errors.password?.join(',')}
          ></FormInputPassword>

          <FormInputPassword
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Password"
            inputElementProps={{ autoComplete: 'off' }}
            errorMsg={formState.errors.confirmpassword?.join(',')}
          ></FormInputPassword>
          <FormInputSelect
            id="userrole"
            name="userrole"
            label="Role"
            optionsList={USER_ROLES_OPTIONS}
            errorMsg={formState.errors.userrole?.join(', ')}
          ></FormInputSelect>

          <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
            {formState.errors._form?.join(',')}
          </p>

          <div className="flex items-center justify-end gap-2">
            <FormSubmit>Add User</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserForm;
