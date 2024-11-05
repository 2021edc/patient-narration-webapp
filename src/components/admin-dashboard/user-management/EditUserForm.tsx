'use client';

import { IEditUserFormState, IUserInfo } from '@/types';
import React, { useEffect, useState } from 'react';
import { EyeOpenIcon, EyeNoneIcon, Pencil1Icon } from '@radix-ui/react-icons';
import FormSubmit from '@/atoms/FormSubmit';
import { LS_KEY_USERSLIST, USER_ROLES_OPTIONS } from '@/constants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
import { readFromLocal, writeToLocal } from '@/lib/localstorageutils';
import { toast } from 'sonner';
import EditUserAction from '@/actions/admin-panel/edituser.action';

interface EditUserFormProps {
  userInfo: IUserInfo;
}

const EditUserForm = ({ userInfo }: EditUserFormProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setShowDialog((prev) => !prev);
      }
    }
  }, [formState.success, formState.data, userInfo.email]);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger>
        <Pencil1Icon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-dark-gray">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user&apos;s full name, password and role
          </DialogDescription>
        </DialogHeader>
        <form className="p-2" action={formAction}>
          <div className="mb-1 w-full">
            <label htmlFor="email" className="block text-light-gray mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg disabled:opacity-60"
              readOnly
              disabled
              defaultValue={userInfo.email}
            />
          </div>
          <div className="mb-1 w-full">
            <label htmlFor="fullname" className="block text-light-gray mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full p-2 border text-dark-gray border-light-gray rounded-lg"
              defaultValue={userInfo.fullname}
            />
            <p className="mb-2 text-red-800 dark:text-red-500 text-xs h-2">
              {formState.errors.fullname?.join(',')}
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
            <Select name="userrole" defaultValue={userInfo.userrole}>
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
            <FormSubmit>Save</FormSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserForm;
