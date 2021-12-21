import React, { useState } from 'react'
import { Button, View, TextInput, StyleSheet, ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import Card from '../../components/card'

export default function resetPassword({navigation}) {

    const auth = getAuth()

    const[email,setEmail]= useState()
    const [errorMessage, setErrorMessage] = useState()

    async function onResetPassword() {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, "users"))
        querySnapshot.forEach((doc) => {
          if(doc.data().email == email) {
            sendPasswordResetEmail(auth, email)
                .catch((error) => {
                    setErrorMessage(error.message)
                })
          }
          else {
              setErrorMessage('No adress finded')
          }
        })

    }
    return (
        <Card style={styles.card}>
            <Text style={styles.text}>Entrez votre adresse email afin de réinitialiser votre mot de passe</Text>
            <TextInput style={styles.input} placeholder="Votre email" onChangeText={(email) => setEmail(email)} />
            {
                errorMessage ? <Text style={{ marginVertical:5, textAlign:'center', color:'tomato'}}> {errorMessage} </Text> : null
            }
            <Button onPress={onResetPassword} title="Valider" />
        </Card>
    )

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginVertical: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor:'#DCDCDC',
        padding: 10,
        borderRadius:4,
    },
    text: {
        fontWeight: 'bold',
        color: 'tomato',
        textAlign:'center'
    },
    view: {
        paddingTop:30,
        padding:20,
    },
    card: {
        flex:1,
        borderRadius:5
    }
})