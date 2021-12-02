import React, { Component } from 'react'
import { View,  Button, TextInput} from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore"

const db = getFirestore();

export class register2 extends Component {
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
                    addDoc(collection(db, "users"), {
                        email:result.user.email,
                        displayName:displayName,
                        uid: result.user.uid
                    });
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                console.log('Users aded')
            })
            .catch( (error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <View>
                <TextInput placeholder="Name" onChangeText={(displayName) => this.setState({displayName})} />
                <TextInput placeholder="Email" onChangeText={(email) => this.setState({email})} />
                <TextInput placeholder="Password" secureTextEntry={true}  onChangeText={(password) => this.setState({password})} />
                <Button onPress={ () => this.onSignUp()} title="Sign up" />
            </View>
        )
    }
}

export default register2
