import React, {useEffect} from "react"
import { View,Text, Button } from "react-native"
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountInformations = ({navigation}) => {

  const logOut = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        async () => {
          try {
            await AsyncStorage.removeItem('userEmail')
          } catch(e) {
            console.log(e)
          }
          console.log('Déconnecté.')
        }
        navigation.navigate('Login')
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <View>
      <Text>Account informations</Text>
      <Text></Text>
      <Button onPress={logOut} title="Sign out"/>
    </View>
  )
}

export default AccountInformations