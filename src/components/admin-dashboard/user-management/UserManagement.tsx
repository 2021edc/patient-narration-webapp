import { API_METHODS, CACHE_TAGS, USER_ROLE_COOKIE } from '@/constants';
import {
  api_admin_get_roles_list,
  api_admin_get_users,
} from '@/utils/url-helper';
import UserTableColumns from './user-table/UserTableColumns';
import UserRoleProvider from '@/context/UserRoleContext';
import makeApiRequest from '@/services/makeApiRequest';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import ErrorText from '@/atoms/ErrorText';
import { cookies } from 'next/headers';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';

const UserManagement = async () => {
  const currentUserCookie = cookies().get(USER_ROLE_COOKIE);
  let currentUserEmail = '';
  if (currentUserCookie && currentUserCookie.value) {
    currentUserEmail = JSON.parse(currentUserCookie.value).email;
  }

  // make backend api call to fetch user role list
  const { data, error, statusCode } = await makeApiRequest(
    api_admin_get_roles_list(),
    API_METHODS.GET,
    {},
    getTokenServerSide()
  );
  // make backend api call to fetch users list
  const {
    data: userData,
    error: userError,
    statusCode: userStatusCode,
  } = await makeApiRequest(
    api_admin_get_users(),
    API_METHODS.GET,
    {},
    getTokenServerSide(),
    CACHE_TAGS.ADMIN_USER_LIST
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full mx-auto p-6 min-h-[calc(100vh-10rem)]">
        <UserRoleProvider roles={data ? data : []}>
          {data && (
            <UserTableColumns
              currentUserEmail={currentUserEmail}
              data={userData ? userData : []}
            />
          )}
        </UserRoleProvider>
        {error && (
          <ErrorText
            message={handleUnauthorizedStatusCode(statusCode) || error}
          ></ErrorText>
        )}
        {userError && (
          <ErrorText
            message={handleUnauthorizedStatusCode(userStatusCode) || userError}
          ></ErrorText>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
