import React, { Component } from 'react'
import { View,  Button, TextInput} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
export class login2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignIn() {
        const { email, password} = this.state
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( (result) => {
                console.log(result)
            })
            .catch( (error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <View>
                <TextInput placeholder="Email" onChangeText={(email) => this.setState({email})} />
                <TextInput placeholder="Password" secureTextEntry={true}  onChangeText={(password) => this.setState({password})} />
                <Button onPress={ () => this.onSignIn()} title="Sign in" />
            </View>
        )
    }
}

export default login2
