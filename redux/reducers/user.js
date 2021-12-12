const initialState = {
    currentUser: null,
    currentUserFavorites: []
}

export const user = (state = initialState, action) => {
    //console.log(action.currentUserFavorites)
    switch(action.type) {
        default:
            return state
        case 'USER_STATE_CHANGE':
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case 'USER_FAVORITES_STATE_CHANGE':
            return {
                ...state,
                currentUserFavorites: [...state.currentUserFavorites, action.currentUserFavorites],
            }
        case 'USER_ADD_FAVORITES':
            return {
                ...state,
                currentUserFavorites: [...state.currentUserFavorites, action.addedItem]
            }
    }
}