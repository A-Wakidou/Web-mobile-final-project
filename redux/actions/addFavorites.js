import { USER_ADD_FAVORITES} from '../constants'

export function addToFavorites(item) {
    return ((dispatch) => {
        dispatch({type: USER_ADD_FAVORITES, addedItem: item})
    })
}