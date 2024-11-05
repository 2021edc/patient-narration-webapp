export const writeToLocal = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const readFromLocal = (key: string) => {
  const storeditem = localStorage.getItem(key);
  if (storeditem) return JSON.parse(storeditem);
  return null;
};
