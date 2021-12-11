const initialState = { favoritesAnime: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      console.log(action.value)
      const favoriteAnimeIndex = state.favoritesAnime.findIndex(item => item.id === action.value)
      if (favoriteAnimeIndex !== -1) {
        // Le Anime est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesAnime: state.favoritesAnime.filter( (item, index) => index !== favoriteAnimeIndex)
        }
      }
      else {
        // Le Anime n'est pas dans les Animes favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesAnime: [...state.favoritesAnime, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite