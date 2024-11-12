'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import EditUserForm from './EditUserForm';
import { IUserInfo } from '@/types';
import EditUserPasswordForm from './EditUserPasswordForm';

interface EditUserFormProps {
  userInfo: IUserInfo;
}

const EditUserDialog = ({ userInfo }: EditUserFormProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil1Icon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-dark-gray h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user&apos;s name, password and role
          </DialogDescription>
        </DialogHeader>
        <EditUserForm userInfo={userInfo}></EditUserForm>
        <EditUserPasswordForm userInfo={userInfo}></EditUserPasswordForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
