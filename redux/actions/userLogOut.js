import { USER_LOG_OUT} from '../constants'

export function userLogOut() {
    return ((dispatch) => {
        dispatch({type: USER_LOG_OUT})
    })
}