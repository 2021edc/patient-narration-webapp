export interface IUserInfo {
  fullname: string;
  email: string;
  userrole: string;
  createdOn: string;
}

export interface INarrationTypes {
  name: string;
  coverage: string;
}

export interface ISigninFormState {
  success: boolean;
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export interface IAddNewUserFormState {
  success: boolean;
  errors: {
    fullname?: string[];
    email?: string[];
    password?: string[];
    confirmpassword?: string[];
    userrole?: string[];
    _form?: string[];
  };
  data?: IUserInfo;
}

export interface IEditUserFormState {
  success: boolean;
  errors: {
    fullname?: string[];
    password?: string[];
    confirmpassword?: string[];
    userrole?: string[];
    _form?: string[];
  };
  data?: {
    fullname: string;
    userrole: string;
  };
}

export interface IUpdatePasswordFormState {
  success: boolean;
  errors: {
    password?: string[];
    confirmpassword?: string[];
    _form?: string[];
  };
  data?: {
    fullname?: string;
  };
}
