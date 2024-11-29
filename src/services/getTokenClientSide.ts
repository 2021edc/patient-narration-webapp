// helper function that calls route handler to get auth token from cookies. to be used inside client components

const getTokenClientSide = async () => {
  const tokenResponse = await fetch('/api/get-token');
  const token = await tokenResponse.json();
  return token;
};

export default getTokenClientSide;
