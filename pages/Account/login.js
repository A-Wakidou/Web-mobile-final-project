import React, {useEffect} from "react"
import { View,Text, Button } from "react-native"
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
  
  /*  const email = data.email
    const password = data.password
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        async () => {
          try {
            await AsyncStorage.setItem('userEmail', user)
          } catch (e) {
            console.log(e)
          }
          console.log(user)
        }
        navigation.navigate('AccountInformations')
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage)
      });*/
    }

  return (
    <View>
      <Text>Login</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
            <View>
              <input {...register("email", {required:true })} placeholder="Email" />
              {errors.email && <span>This field is required</span>}
            </View>
            <View>
              <input {...register("password", { required: true })} placeholder="Password" type="password" />
              {errors.password && <span>This field is required</span>}
            </View>
            <input type="submit" />
        </form>
        <Button title="Register" />
    </View>
  )
}

export default Login