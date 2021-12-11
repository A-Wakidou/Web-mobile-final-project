const initialState = {
    favoritesFilm: []
}

function reducerProfil(state, action) {
    let nextState
    switch(action.type) {
        case 'CURRENT_USER':
            nextState = {
                ...state,
                profil: action.currentUser
            }
    }
}