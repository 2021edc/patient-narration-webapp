import { ISigninResponse } from './api/auth';
import { INarrationParsedData } from './api/narration';

export interface INarrationTypes {
  name: string;
  coverage: string;
}

export interface ISigninFormState {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  isActiveSession?: boolean;
  data?: ISigninResponse;
}

export interface IAddNewUserFormState {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmpassword?: string[];
    userrole?: string[];
    _form?: string[];
    errorStatusCode?: number;
  };
}

export interface IEditUserFormState {
  success: boolean;
  errors: {
    userrole?: string[];
    _form?: string[];
    errorStatusCode?: number;
  };
  data?: {
    userrole: string;
  };
}

export interface IUpdatePasswordFormState {
  success: boolean;
  errors: {
    password?: string[];
    confirmpassword?: string[];
    _form?: string[];
    errorStatusCode?: number;
  };
  data?: {
    newPassword?: string;
  };
}

export interface IUploadNarrationFileFormState {
  success: boolean;
  errors: {
    _form?: string[];
  };
  data?: INarrationParsedData;
}
