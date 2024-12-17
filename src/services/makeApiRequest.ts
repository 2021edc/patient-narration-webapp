import { API_METHODS } from '@/constants';
import handleMissingFieldsError from './handleMissingFieldsError';

const BODY_DATA_METHODS = [
  API_METHODS.POST,
  API_METHODS.PATCH,
  API_METHODS.PUT,
];

// resuable helper function, uses fetch API to make api requests. returns data if available,error message if any and response status code
// compulsory parameters - url, request method, body data(optional for GET,DELETE), auth token
// optional - cache tag string, no cache option
const makeApiRequest = async <TData>(
  url: string,
  apiMethod: API_METHODS,
  bodyData: TData | undefined = undefined,
  bearerToken: string | undefined = undefined,
  tag: string | undefined = undefined,
  noCache: boolean = false
) => {
  console.log(`Calling API endpoint - ${apiMethod} - ${url}`);
  let error: string | undefined;

  // Initailize request headers
  const headers: HeadersInit = {};
  headers['Content-Type'] = 'application/json';

  // Add auth token as bearer token if provided
  if (bearerToken) {
    headers['Authorization'] = `Bearer ${bearerToken}`;
  }

  // Create request options
  const requestOptions: RequestInit = {
    method: apiMethod,
    headers,
  };

  if (noCache) {
    requestOptions.cache = 'no-store';
  }

  if (tag) {
    requestOptions.next = { tags: [tag] };
  }

  // Add request body only for POST,PATCH,PUT requests
  if (BODY_DATA_METHODS.includes(apiMethod)) {
    requestOptions.body = JSON.stringify(bodyData);
  }

  // Return API response
  const response = await fetch(url, requestOptions);
  const statusCode = response.status;

  // handle error from api.
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('Response', errorResponse);
    console.error('Request Headers', requestOptions);
    try {
      // check if fastapi returns missing fields error in response.detail
      if (errorResponse.detail instanceof Array) {
        error = handleMissingFieldsError(errorResponse.detail);
      } else {
        error = errorResponse.message
          ? errorResponse.message
          : 'Something went wrong';
      }
    } catch {
      error = 'Something went wrong';
    }

    return { statusCode, error };
  }

  // get data from response and return
  const data = await response.json();
  return { data, statusCode, error };
};

export default makeApiRequest;
