'use client';

import { createContext, useContext } from 'react';
import { IAdminUserRole } from '@/types/api/admin';

// context component that will provide the user roles data to child components

interface UserRoleContextType {
  roles: IAdminUserRole[];
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

interface UserRoleProviderProps {
  children: React.ReactNode;
  roles: IAdminUserRole[];
}

const UserRoleProvider = ({ children, roles }: UserRoleProviderProps) => {
  return (
    <UserRoleContext.Provider value={{ roles }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default UserRoleProvider;

export function useUserRoleData(): UserRoleContextType {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('userUserRoleData must be used within a UserRoleProvider');
  }
  return context;
}
