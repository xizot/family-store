export const getResponseError = (error) => {
  const responseError = error.response?.data?.errorMessage;
  return (typeof responseError !== 'object' && responseError) || 'Something went wrong!';
};
