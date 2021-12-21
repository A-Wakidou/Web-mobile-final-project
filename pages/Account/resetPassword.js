import React, { useState } from 'react'
import { Button, View, TextInput, StyleSheet, Text, Modal,Pressable,ActivityIndicator} from 'react-native'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import Card from '../../components/card'

export default function resetPassword(props) {

    const auth = getAuth()
    const [modalVisible, setModalVisible] = useState(false)
    const[email,setEmail]= useState()
    const [errorMessage, setErrorMessage] = useState(false)
    const [isLoading, setLoading] = useState(false);

    async function onResetPassword() {
        setLoading(true)
        const db = getFirestore()
        var resetEmailSent = false
        var recipientEmail = ""
        const querySnapshot = await getDocs(collection(db, "users"))

        querySnapshot.forEach((doc) => {
          if(doc.data().email == email) {
            recipientEmail = doc.data().email
          }
        })

        if(recipientEmail){
            sendPasswordResetEmail(auth, email)
                .then( () => {
                    setModalVisible(true)
                    resetEmailSent = true
                    if(errorMessage){
                        setErrorMessage(false)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                })
        }

        if(resetEmailSent == false && !recipientEmail) {
            setLoading(false)
            setErrorMessage('No adress finded')
        }
    }
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Entrez votre adresse email afin de réinitialiser votre mot de passe</Text>
            <TextInput style={styles.input} placeholder="Votre email" onChangeText={(email) => setEmail(email.toLowerCase())} />
            {
                errorMessage ? <Text style={{ marginVertical:5, textAlign:'center', color:'tomato'}}> {errorMessage} </Text> : null
            }
            {isLoading ? <ActivityIndicator style={{marginVertical:10}}/> : null}
            <Button onPress={onResetPassword} title="Valider" />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Un email a été envoyé afin de réinitialiser votre mot de passe.</Text>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {
                                setModalVisible(!modalVisible)
                                props.navigation.navigate('Login')
                                }
                            }>
                            <Text style={styles.textStyle}>Retour</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginVertical: 25,
        marginBottom: 15,
        borderWidth: 1,
        borderColor:'#DCDCDC',
        padding: 10,
        borderRadius:4,
    },
    text: {
        fontWeight: 'bold',
        color: 'tomato',
        textAlign:'center',
        fontSize:18
    },
    card: {
        flex:1,
        borderRadius:5,
        padding:15,
        paddingTop:50,
        backgroundColor: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'tomato',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:12
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight:'bold',
        fontSize:12
    }
})