import { INarrationTypes } from '@/types';

export const AUTH_COOKIE = 'authentication';
export const USER_ROLE_COOKIE = 'user-role';
export enum PREFERENCE_COOKIES {
  PAGE_SIZE = 'page_size_limit',
}

export enum USER_ROLES {
  ADMIN = 'Admin',
  ANALYST = 'Analyst',
}

export const COOKIE_EXPIRY = 60 * 60 * 1; // seconds * minutes * hours - cookie expiry set to 1 hours

export const NARRATION_TYPES_LIST: INarrationTypes[] = [
  { name: 'TAVI', coverage: 'All TAVI studies' },
  { name: 'Surgical Valve', coverage: 'Dafodil' },
  { name: 'PCI - Balloon Study', coverage: 'dES, BAllons, meres' },
  { name: 'PCI - Self Expandable Stent', coverage: 'dES, BAllons, meres' },
  { name: 'PCI - Stent Study', coverage: 'dES, BAllons, meres' },
  { name: 'Ortho Study - Hip Replacement', coverage: 'TKR - Hip replacement' },
  {
    name: 'Ortho Study - Total Knee Arthroplasty',
    coverage: 'TKR - Total Knee Arthroplasty',
  },
  {
    name: 'Ortho Study - Total Knee Replacement',
    coverage: 'TKR - Total Knee Replacement',
  },
  { name: 'General', coverage: 'CARTNAL, Floret ASD' },
];

export const MAX_SUBJECT_LIMIT = 30;

export const REQUEST_HISTORY_PAGESIZES = [20, 50, 100, 200, 500];

export enum API_METHODS {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum CACHE_TAGS {
  ADMIN_USER_LIST = 'admin-users-list',
  ADMIN_USER_ROLES = 'admin-user-roles',
  GENERATE_NARRATION = 'generate-narration',
  REQUEST_HISTORY = 'request-history',
  REQUEST_HISTORY_TOTAL = 'request-history-total',
}

export enum APP_PATHS {
  ADMIN_REQ_HISTORY = '/admin/request-history?page=1',
}
