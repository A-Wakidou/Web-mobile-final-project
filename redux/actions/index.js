import {getAuth} from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import { USER_STATE_CHANGE, USER_GET_FAVORITES } from '../constants'

export function fetchUser() {
  return ((dispatch) => {
    const auth = getAuth();
    const db = getFirestore()
    async function getUser() {
      console.log('aa')
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if(doc.data().uid == auth.currentUser.uid) {
            dispatch({type: USER_STATE_CHANGE, currentUser: doc.data()})
          }
        });
      }
    async function getUserFavorites() {
      const querySnapshot = await getDocs(collection(db, "favorites"))
      querySnapshot.forEach((doc) => {
        if(doc.data().uid == auth.currentUser.uid) {
          dispatch({type: USER_GET_FAVORITES, currentUserFavorites: doc.data()})
        }
        else {
        }
      })
    }
      getUser()
      getUserFavorites()
    })
}