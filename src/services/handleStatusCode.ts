// retrun unauthorized message if status code is 401 or 403 else return undefined
const handleUnauthorizedStatusCode = (statusCode: number) => {
  if (statusCode === 403 || statusCode === 401) {
    return 'Unauthorized, your session has expired. Please login again';
  }
  return;
};

export default handleUnauthorizedStatusCode;
