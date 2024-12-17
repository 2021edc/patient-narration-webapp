// returns missing form field errors from FastAPI as a single comma separated string.
// returns type, location and msg for each missing field errors.

import { IMissingFieldError } from '@/types';

const handleMissingFieldsError = (errorResponse: IMissingFieldError[]) => {
  return errorResponse
    .map((errorDetail: any) => {
      return `${errorDetail.type} - ${errorDetail.loc.join(' ')} - ${errorDetail.msg}`;
    })
    .join(',');
};

export default handleMissingFieldsError;
