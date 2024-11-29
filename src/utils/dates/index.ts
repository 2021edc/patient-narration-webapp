export const dateUtcToIso = (dateString: string) => {
  return new Date(dateString)
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')
    .slice(0, -4);
};
