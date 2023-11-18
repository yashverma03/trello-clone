const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const getKanbanData = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

export default getKanbanData;
