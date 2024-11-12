import { INarrationTypes } from '@/types';

export const AUTH_COOKIE = 'authentication';
export const USER_ROLE_COOKIE = 'user-role';

export enum USER_ROLES {
  ADMIN = 'admin',
  ANALYST = 'analyst',
}

export enum ADMIN_DASHBOARD_TABS {
  USER_MANAGEMENT = 'User Management',
  REQUEST_HISTORY = 'Request History',
}

export const USER_ROLES_OPTIONS = ['Admin', 'Analyst'];

export const LS_KEY_USERSLIST = 'userlist';

export const NARRATION_TYPES_LIST: INarrationTypes[] = [
  { name: 'TAVI', coverage: 'All TAVI studies' },
  { name: 'Surgical Value', coverage: 'Dafodil' },
  { name: 'PCI', coverage: 'dES, BAllons, meres' },
  { name: 'Ortho', coverage: 'TKR - Hip replacement' },
  { name: 'General', coverage: 'CARTNAL, Floret ASD' },
];

export const MAX_SUBJECT_LIMIT = 30;

export const REQUEST_HISTORY_PAGESIZES = [15, 20, 50, 100, 200];
