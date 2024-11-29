export interface IAdminUserInfo {
  id: string;
  user_id: string;
  role_id: string;
  role_name: string;
  user_name: string;
  email: string;
  is_active: boolean;
  is_role_active: boolean;
  is_user_active: boolean;
  access_level: number;
  created_on: string;
}

export interface IAdminUserRole {
  id: string;
  name: string;
  description: string;
  access_level: number;
  is_active: boolean;
  created_on: string;
  modified_on: string;
}
