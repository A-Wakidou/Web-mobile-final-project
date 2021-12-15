import { USER_DELETE_FAVORITES} from '../constants'

export function deleteFromFavorites(i) {
    return ((dispatch) => {
        dispatch({type: USER_DELETE_FAVORITES, i: i})
    })
}