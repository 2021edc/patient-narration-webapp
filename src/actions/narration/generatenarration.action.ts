'use server';

import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import { api_narration_generate_narration } from '@/utils/url-helper';
import { redirect } from 'next/navigation';

const GenerateNarrationAction = async (
  narrationType: string,
  subjects: string,
  formData: FormData
) => {
  const authToken = getTokenServerSide();
  if (!authToken) {
    redirect('/login');
  }

  // make api request to the backend with narration_type and subjects as query parameters, file in body
  const response = await fetch(
    api_narration_generate_narration({
      narration_type: narrationType,
      filter_value: subjects,
    }),
    {
      method: API_METHODS.POST,
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  // return api errors if any to the UI
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse);
    return {
      error:
        handleUnauthorizedStatusCode(response.status) || errorResponse.message,
    };
  }

  // return the data returned from backend api
  const data = await response.json();
  return { data };
};

export default GenerateNarrationAction;
