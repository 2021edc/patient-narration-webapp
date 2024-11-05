'use client';

import React, { useEffect, useState } from 'react';
import { EyeOpenIcon, EyeNoneIcon, PlusIcon } from '@radix-ui/react-icons';
import FormSubmit from '@/atoms/FormSubmit';
import { LS_KEY_USERSLIST, USER_ROLES_OPTIONS } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormState } from 'react-dom';
import { IAddNewUserFormState } from '@/types';
import AddNewUserAction from '@/actions/admin-panel/addnewuser.action';
import { readFromLocal, writeToLocal } from '@/lib/localstorageutils';
import { toast } from 'sonner';

const AddUserForm = () => {
  const [showDialog, setShowDialog] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialState: IAddNewUserFormState = { success: false, errors: {} };
  const [formState, formAction] = useFormState(AddNewUserAction, initialState);

  useEffect(() => {
    if (formState.success && formState.data) {
      const storedUsers = readFromLocal(LS_KEY_USERSLIST) || null;
      if (storedUsers)
        writeToLocal(LS_KEY_USERSLIST, [...storedUsers, formState.data]);
      else writeToLocal(LS_KEY_USERSLIST, [formState.data]);

      toast.success('User added successfully');
      setShowDialog((prev) => !prev);
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
        <form className="p-2" action={formAction}>
          <div className="mb-1 w-full">
            <label htmlFor="fullname" className="block text-light-gray mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg"
            />
            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
              {formState.errors.fullname?.join(',')}
            </p>
          </div>
          <div className="mb-1 w-full">
            <label htmlFor="email" className="block text-light-gray mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg"
            />
            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
              {formState.errors.email?.join(',')}
            </p>
          </div>
          <div className="mb-1 w-full">
            <div className="relative w-full">
              <label htmlFor="password" className="block text-light-gray mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full p-2 border border-light-gray text-dark-gray rounded-lg"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 mt-1 transform text-dark-gray"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeNoneIcon className="h-6 w-6" />
                ) : (
                  <EyeOpenIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
              {formState.errors.password?.join(',')}
            </p>
          </div>

          <div className="mb-1 w-full">
            <div className="relative w-full">
              <label
                htmlFor="confirmpassword"
                className="block text-light-gray mb-2"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmpassword"
                name="confirmpassword"
                className="w-full p-2 border border-light-gray text-dark-gray rounded-lg"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 mt-1 transform text-[#393E46]"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <EyeNoneIcon className="h-6 w-6" />
                ) : (
                  <EyeOpenIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
              {formState.errors.confirmpassword?.join(',')}
            </p>
          </div>
          <div>
            <label htmlFor="userrole" className="block text-light-gray mb-2">
              Role
            </label>
            <Select name="userrole">
              <SelectTrigger className="w-full !h-11 bg-white text-black">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent id="userrole" className="bg-white text-black">
                <SelectGroup>
                  {USER_ROLES_OPTIONS.map((role) => (
                    <SelectItem value={role} key={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
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
