'use client';

import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { IUserInfo } from '@/types';
import EditUserForm from './EditUserForm';

interface UserTableProps {
  userList: IUserInfo[];
}

const UserTable = ({ userList }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2 px-4 text-left" colSpan={2}>
            Name
          </TableHead>
          <TableHead className="py-2 px-4 text-left" colSpan={2}>
            Email
          </TableHead>
          <TableHead className="py-2 px-4 text-left">Role</TableHead>
          <TableHead className="py-2 px-4 text-left">Date Created</TableHead>
          <TableHead className="py-2 px-4 text-left">Active</TableHead>
          <TableHead className="py-2 px-4 text-left">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.email} className="border-b dark:border-gray-700">
            <TableCell className="py-2 px-4" colSpan={2}>
              {user.fullname}
            </TableCell>
            <TableCell className="py-2 px-4" colSpan={2}>
              {user.email}
            </TableCell>
            <TableCell className="py-2 px-4">{user.userrole}</TableCell>
            <TableCell className="py-2 px-4">{user.createdOn}</TableCell>
            <TableCell className="py-2 px-4">
              <Switch></Switch>
            </TableCell>
            <TableCell className="py-2 px-4">
              <EditUserForm userInfo={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
