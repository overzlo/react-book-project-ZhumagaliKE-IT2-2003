export const addToFavorites = (bookId) => {
    return {
      type: 'ADD_TO_FAVORITES',
      payload: bookId
    };
  };
  
  export const removeFromFavorites = (bookId) => {
    return {
      type: 'REMOVE_FROM_FAVORITES',
      payload: bookId
    };
  };