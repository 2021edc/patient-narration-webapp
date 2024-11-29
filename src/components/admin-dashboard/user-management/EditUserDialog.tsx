'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import EditUserForm from './EditUserForm';
import EditUserPasswordForm from './EditUserPasswordForm';
import { IAdminUserInfo } from '@/types/api/admin';

interface EditUserFormProps {
  userInfo: IAdminUserInfo | null;
  open: boolean;
  onOpenChange: () => void;
}

// component that renders a dialog with two different forms for updating user role and generating password

const EditUserDialog = ({
  userInfo,
  open,
  onOpenChange,
}: EditUserFormProps) => {
  if (!userInfo) return <></>;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
