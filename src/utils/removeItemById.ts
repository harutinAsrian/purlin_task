export const removeItemById = (itemId: string) => {
  fetch(`http://localhost:8000/listings/${itemId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Item with ID ${itemId} has been removed successfully`);
      } else {
        throw new Error(`Failed to remove item with ID ${itemId}`);
      }
    })
    .catch((error) => {
      console.error('Delete error:', error);
    });
};
