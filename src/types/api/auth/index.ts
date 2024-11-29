export interface IStoredUserInfo {
  email: string;
  user_role: string;
}

export interface ISigninResponse {
  status: string;
  token: string;
  is_active_session: boolean;
  name: string;
  email: string;
  user_role: string[];
}

export interface ISessionTransferResponse {
  status: string;
  token: string;
}
