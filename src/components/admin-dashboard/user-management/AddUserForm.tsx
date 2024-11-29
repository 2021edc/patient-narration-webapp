'use client';

import React, { useEffect, useState } from 'react';
import FormSubmit from '@/atoms/formelements/FormSubmit';
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
import { toast } from 'sonner';
import FormInput from '@/atoms/formelements/FormInput';
import FormInputPassword from '@/atoms/formelements/FormInputPassword';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUserRoleData } from '@/context/UserRoleContext';

// component that renders a form in dialog to add new user.

const AddUserForm = () => {
  const { roles } = useUserRoleData();
  const [showDialog, setShowDialog] = useState(false);
  const initialState: IAddNewUserFormState = { success: false, errors: {} };

  const [formState, formAction] = useFormState(AddNewUserAction, initialState);

  useEffect(() => {
    if (formState.success) {
      toast.success('User added successfully');
      setShowDialog((prev) => !prev);
    }
  }, [formState.success]);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className="text-base font-semibold w-full flex gap-1 p-3 justify-center items-center bg-dark-bg rounded-md text-white">
        Add New User
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
            id="name"
            name="name"
            label="Name"
            inputElementProps={{ type: 'text', autoComplete: 'off' }}
            errorMsg={formState.errors.name?.join(',')}
          ></FormInput>
          <FormInput
            id="email"
            name="email"
            label="Email"
            inputElementProps={{ type: 'email', autoComplete: 'new-email' }}
            errorMsg={formState.errors.email?.join(',')}
          ></FormInput>

          <FormInputPassword
            id="password"
            name="password"
            label="Password"
            inputElementProps={{ autoComplete: 'new-password' }}
            errorMsg={formState.errors.password?.join(',')}
          ></FormInputPassword>

          <FormInputPassword
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Password"
            inputElementProps={{ autoComplete: 'new-password' }}
            errorMsg={formState.errors.confirmpassword?.join(',')}
          ></FormInputPassword>

          <div className="w-full mb-1">
            <label className="text-light-gray mb-2`" htmlFor={''}>
              User Role
            </label>
            <Select name="userrole">
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
            <FormSubmit>Add User</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserForm;
