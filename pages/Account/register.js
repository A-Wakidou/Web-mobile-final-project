import React from "react"
import { View,Text, Alert } from "react-native"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDRSx-LtMPYklEzpTgNb2sJZsE_zmAico4",
  authDomain: "webmobilefinalproject.firebaseapp.com",
  projectId: "webmobilefinalproject",
  storageBucket: "webmobilefinalproject.appspot.com",
  messagingSenderId: "696135217813",
  appId: "1:696135217813:web:8a2c9c8e7d6e143f86a19c"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth();

const Register = ({navigation}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
      const email = data.email
      const password = data.password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
        })
    }
  
  return (
    <View>
      <Text>Register</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
            <View>
              <input {...register("email", {required:true })} placeholder="Email" />
              {errors.email && <span>This field is required</span>}
            </View>
            <View>
              <input {...register("password", { required: true })} placeholder="Password" />
              {errors.password && <span>This field is required</span>}
            </View>
            <input type="submit" />
        </form>
    </View>
  )
}

export default Register