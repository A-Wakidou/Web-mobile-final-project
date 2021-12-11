import React, { Component } from 'react'
import { View,  Button, TextInput, StyleSheet, Keyboard} from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore"
import Card from '../../components/card'

export class Register extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            displayName: ''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp() {
        const { email, password, displayName} = this.state
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( (result) => {
                try {
                    const db = getFirestore();
                    addDoc(collection(db, "users"), {
                        email:result.user.email,
                        displayName:displayName,
                        uid: result.user.uid
                    })
                    Keyboard.dismiss()
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
            })
            .catch( (error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.view}>
                    <TextInput style={styles.input} placeholder="Name" onChangeText={(displayName) => this.setState({displayName})} />
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => this.setState({email})} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}  onChangeText={(password) => this.setState({password})} />
                    <Button onPress={ () => this.onSignUp()} title="Sign up" />
                </View>
            </Card>
        )
    }
}

export default Register

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

