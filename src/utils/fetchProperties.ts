import { Listing } from 'src/types';

export const fetchProperties = async () => {
  try {
    const response = await fetch('http://localhost:8000/listings');
    if (!response.ok) {
      throw new Error('Failed to fetch data from the database');
    }

    const data: Listing[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
