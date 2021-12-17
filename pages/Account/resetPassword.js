import React, { useState } from 'react'
import { Button, View, TextInput, StyleSheet, ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import Card from '../../components/card'

export default function resetPassword({navigation}) {

    const[email,setEmail]= useState()
    function onResetPassword() {
        sendPasswordResetEmail(auth, email)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        })
    }
    return (
        <Card style={styles.card}>
            <Text style={styles.text}>Entrez votre adresse email afin de réinitialiser votre mot de passe</Text>
            <TextInput style={styles.input} placeholder="Votre email" onChangeText={(email) => setEmail(email)} />
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