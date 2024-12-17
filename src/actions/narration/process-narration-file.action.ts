'use server';

import { API_METHODS } from '@/constants';
import { getTokenServerSide } from '@/services/getTokenServerSide';
import handleMissingFieldsError from '@/services/handleMissingFieldsError';
import handleUnauthorizedStatusCode from '@/services/handleStatusCode';
import { IUploadNarrationFileFormState } from '@/types';
import { api_narration_process_file } from '@/utils/url-helper';
import { redirect, RedirectType } from 'next/navigation';

const ProcessNarrationFileAction = async (
  formState: IUploadNarrationFileFormState,
  formData: FormData
): Promise<IUploadNarrationFileFormState> => {
  const authToken = getTokenServerSide();
  if (!authToken) {
    redirect('/login', RedirectType.replace);
  }

  // get input file from form data
  const narrationFile = formData.get('narration_file') as File;
  const narrationType = formData.get('narration_type') as string;

  // if input file is absent, return error message to UI
  if (!narrationFile || narrationFile.name === 'undefined') {
    return { success: false, errors: { _form: ['Select an input file'] } };
  }

  if (!narrationType) {
    return { success: false, errors: { _form: ['Select a narration type'] } };
  }

  // make backend api call with input file
  const response = await fetch(api_narration_process_file(narrationType), {
    method: API_METHODS.POST,
    body: formData,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  // return api errors if any to the UI
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error(errorResponse);
    if (errorResponse.detail && errorResponse.detail instanceof Array) {
      const errorMsg = handleMissingFieldsError(errorResponse.detail);
      return { success: false, errors: { _form: [errorMsg] } };
    }
    return {
      success: false,
      errors: {
        _form: [
          handleUnauthorizedStatusCode(response.status) ||
            errorResponse.message,
        ],
      },
    };
  }

  // Return the processes data to the UI
  const data = await response.json();
  return { success: true, errors: {}, data };
};

export default ProcessNarrationFileAction;
