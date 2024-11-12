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
import EditUserDialog from './EditUserDialog';

interface UserTableProps {
  userList: IUserInfo[];
}

const TABLE_HEADERS = [
  'Name',
  'Email',
  'Role',
  'Date Created',
  'Active',
  'Actions',
];

const UserTable = ({ userList }: UserTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map((header) => (
            <TableHead
              key={header}
              className="py-2 px-4 text-center bg-dark-gray text-white"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user.email} className="border-b dark:border-gray-700">
            <TableCell className="py-4 px-4 text-center">
              {user.fullname}
            </TableCell>
            <TableCell className="py-4 px-4 text-center">
              {user.email}
            </TableCell>
            <TableCell className="py-4 px-4 text-center">
              {user.userrole}
            </TableCell>
            <TableCell className="py-4 px-4 text-center">
              {user.createdOn}
            </TableCell>
            <TableCell className="py-4 px-4 text-center">
              <Switch></Switch>
            </TableCell>
            <TableCell className="py-4 px-4 text-center">
              <EditUserDialog userInfo={user}></EditUserDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
