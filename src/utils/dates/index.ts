export const dateUtcToIso = (dateString: string) => {
  return dateString.replace('T', ' ').slice(0, -7);
};
