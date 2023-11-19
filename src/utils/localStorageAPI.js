export const localStorageKey = {
  grouping: 'grouping',
  ordering: 'ordering'
};

export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    throw new Error('Unable to fetch data from local storage');
  }
};

export const setData = (key, value) => {
  try {
    const formattedValue = JSON.stringify(value);
    localStorage.setItem(key, formattedValue);
  } catch (error) {
    throw new Error('Unable to save data from local storage');
  }
};
