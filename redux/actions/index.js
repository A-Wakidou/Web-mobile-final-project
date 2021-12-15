import {getAuth, signOut} from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import { USER_STATE_CHANGE, USER_GET_FAVORITES } from '../constants'

export function fetchUser() {
  return ((dispatch) => {
    const auth = getAuth();
    const db = getFirestore()
    async function getUser() {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if(doc.data().uid == auth.currentUser.uid) {
            dispatch({type: USER_STATE_CHANGE, currentUser: doc.data()})
            //console.log('Profil récupéré')
          }
          else {
            //console.log('Impossible de récuperer le profil')
            /*signOut(auth)
              .catch((error) => {
                  console.log(error)
                });*/
          }
        });
      }
    async function getUserFavorites() {
      const querySnapshot = await getDocs(collection(db, "favorites"))
      querySnapshot.forEach((doc) => {
        if(doc.data().userId == auth.currentUser.uid) {
          dispatch({type: USER_GET_FAVORITES, currentUserFavorites: doc.data()})
          //console.log('Favoris récupéré')
        }
        else {
          //console.log('Impossible de récuperer les faovirs')
        }
      })
    }
      getUser()
      getUserFavorites()
    })
}