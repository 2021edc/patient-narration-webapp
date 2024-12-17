'use client';

import { IAdminUserInfo } from '@/types/api/admin';
import { ColumnDef } from '@tanstack/react-table';
import EditUserDialog from '../EditUserDialog';
import UserActivateSwitch from '../UserActivateSwitch';
import { useCallback, useState } from 'react';
import UserTable from './UserTable';
import { Button } from '@/components/ui/button';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { dateUtcToIso } from '@/utils/dates';

interface UserTableColumnsProps {
  data: IAdminUserInfo[];
  currentUserEmail: string;
}

// component defines user list table columns, render user list table and edit user dialog
const UserTableColumns = ({
  data,
  currentUserEmail,
}: UserTableColumnsProps) => {
  const formatDateFunction = useCallback(
    (dateString: string) => dateUtcToIso(dateString),
    []
  );

  const [selectedUser, setSelectedUser] = useState<IAdminUserInfo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  // user list table column defintions
  const columns: ColumnDef<IAdminUserInfo>[] = [
    {
      accessorKey: 'user_name',
      header: 'Name',
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role_name', header: 'Role' },
    {
      accessorKey: 'created_on',
      cell: ({ row }) => formatDateFunction(row.original.created_on),
      header: 'Created On',
    },
    {
      accessorKey: 'is_user_active',
      header: 'Active',
      cell: ({ row }) => (
        <UserActivateSwitch
          isCurrentUser={currentUserEmail === row.original.email}
          userInfo={row.original}
        ></UserActivateSwitch>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant={'ghost'}
          disabled={currentUserEmail === row.original.email}
          onClick={() => {
            setSelectedUser(row.original);
            setOpenDialog(true);
          }}
        >
          <Pencil1Icon className="h-6 w-6" />
        </Button>
      ),
    },
  ];

  // render user table and edit user dialog.
  return (
    <div>
      <UserTable columns={columns} data={data}></UserTable>
      <EditUserDialog
        open={openDialog}
        onOpenChange={handleDialogClose}
        userInfo={selectedUser}
      ></EditUserDialog>
    </div>
  );
};

export default UserTableColumns;
