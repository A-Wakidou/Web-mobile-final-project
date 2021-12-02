import { useState } from "react";
import {getAuth,onAuthStateChanged,User,signInWithRedirect,GoogleAuthProvider,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();


const useFirebaseLogin = () => {
    const [user, setUser] = useState(null);
  
    const checkAuth = () =>
      new Promise((resolve) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (u) => {
          setUser(u);
          resolve();
        });
      });
  
    const connectionWithGoogle = () => {
      const auth = getAuth();
      signInWithRedirect(auth, provider);
    };
  
    const connectEmailPassword = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
          console.log(value);
          navigation.navigate('AccountInformations')
        })
        .catch(() => {
          createUserWithEmailAndPassword(auth, email, password).then((value) => {
            console.log(value);
          });
        });
    };
  
    const logout = () => {
      const auth = getAuth();
      signOut(auth);
    };
  
    return {
      user,
      checkAuth,
      connectionWithGoogle,
      connectEmailPassword,
      logout,
    };
  };
  
  export default useFirebaseLogin;
  
