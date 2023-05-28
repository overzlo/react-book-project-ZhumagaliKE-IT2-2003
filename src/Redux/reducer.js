const initialState = {
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        const bookIdToAdd = action.payload;
        if (!state.favorites.includes(bookIdToAdd)) {
          const updatedFavorites = [...state.favorites, bookIdToAdd];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          return { ...state, favorites: updatedFavorites };
        }
        return state;
  
      case 'REMOVE_FROM_FAVORITES':
        const bookIdToRemove = action.payload;
        const updatedFavorites = state.favorites.filter((bookId) => bookId !== bookIdToRemove);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { ...state, favorites: updatedFavorites };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  