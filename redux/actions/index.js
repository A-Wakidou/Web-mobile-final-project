import {getAuth, signOut} from 'firebase/auth'
import {doc, getDocs, getFirestore, collection} from 'firebase/firestore'
import { USER_STATE_CHANGE } from '../constants'

export function fetchUser() {
    return ((dispatch) => {
            const auth = getAuth();
            const db = getFirestore()
            async function getUser() {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                  console.log(doc.data().uid)
                  console.log(auth.currentUser.uid)
                  if(doc.data().uid == auth.currentUser.uid) {
                    dispatch({type: USER_STATE_CHANGE, currentUser: doc.data()})
                  }
                  else {
                      console.log('No document')
                      signOut(auth).then(() => {
                        navigation.navigate('Login')
                      }).catch((error) => {
                        console.log(error)
                      });
                  }
                });
            }
            getUser()
        })
    }

        /*
        firebase.firestore()
            .collection('user')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if(snapshot.exists) {
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log('does not exist')
                }
            })
            */