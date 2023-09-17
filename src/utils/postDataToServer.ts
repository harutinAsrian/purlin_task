import { Listing } from 'src/types';

export async function postDataToServer(data: Listing) {
  try {
    const response = await fetch('http://localhost:8000/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Data posted successfully.');
    } else {
      console.error('Failed to post data to the server.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
