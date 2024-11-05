'use client';

import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import { IUserInfo } from '@/types';
import { readFromLocal } from '@/lib/localstorageutils';
import { LS_KEY_USERSLIST } from '@/constants';
import AddUserForm from './AddUserForm';
import { ReloadIcon } from '@radix-ui/react-icons';

const UserManagement = () => {
  const [fullUserList, setFullUserList] = useState<IUserInfo[]>([]);
  const [userList, setUserList] = useState<IUserInfo[]>([]);

  const fetchUsersList = () => {
    const storedUsers = readFromLocal(LS_KEY_USERSLIST);
    if (storedUsers) {
      setFullUserList([...storedUsers]);
      setUserList([...storedUsers]);
    }
  };

  // TODO replace with call to backend api to get users list
  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleRefresh = () => {
    fetchUsersList();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      const filteredUsers = fullUserList.filter((user) =>
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUserList([...filteredUsers]);
    } else {
      setUserList([...fullUserList]);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full mx-auto p-6 min-h-[calc(100vh-10rem)]">
        <div className="flex items-center gap-4 w-full my-6">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search users..."
            className="border p-2 rounded-lg w-1/2 border-dark-gray dark:border-light-text"
          />
          <AddUserForm></AddUserForm>
          <button
            className="flex gap-1 py-2 px-4 items-center dark:bg-gray-400 dark:hover:bg-gray-100 dark:text-black bg-gray-700 text-white rounded-md hover:bg-gray-600"
            onClick={handleRefresh}
          >
            <ReloadIcon className="h-4 w-4"></ReloadIcon>
            Refresh
          </button>
        </div>
        <UserTable userList={userList} />
      </div>
    </div>
  );
};

export default UserManagement;
