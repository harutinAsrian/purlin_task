import { Listing } from 'src/types';

export const updateItemById = (id: string, newData: Listing) => {
  fetch(`http://localhost:8000/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((updatedListing) => {
      console.log('Updated Listing:', updatedListing);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
