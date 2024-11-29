'use server';

import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import makeApiRequest from '@/services/makeApiRequest';
import { api_process_pn_get_downloadlink } from '@/utils/url-helper';
import { redirect } from 'next/navigation';

const GetDownloadLinkAction = async (narrationId: string) => {
  const token = getTokenServerSide();
  if (!token) redirect('/login');

  const { data, error, statusCode } = await makeApiRequest(
    api_process_pn_get_downloadlink(narrationId),
    API_METHODS.GET,
    {},
    token,
    undefined,
    true
  );

  if (error) {
    return { error: handleUnauthorizedStatusCode(statusCode) || error };
  }
  return { data };
};

export default GetDownloadLinkAction;
