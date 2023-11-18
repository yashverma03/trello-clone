export const localStorageKey = {
  grouping: 'grouping',
  ordering: 'ordering'
};

export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    const parsedData = JSON.parse(data ?? 'null');
    return parsedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setData = (key, value) => {
  try {
    const formattedValue = JSON.stringify(value);
    localStorage.setItem(key, formattedValue);
  } catch (error) {
    throw new Error(error.message);
  }
};
