import React, { Component } from 'react'
import { Button, TextInput, StyleSheet, ActivityIndicator} from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Card from '../../components/card'

export class Login2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            email: '',
            password: '',
        }
        this.onSignIn = this.onSignIn.bind(this)
    }
    onSignIn() {
        this.setState({loading:true})
        const { email, password} = this.state
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( (result) => {
                console.log('LoggedIn')
                this.setState({loading:false})
            })
            .catch( (error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <Card style={styles.view}>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => this.setState({email})} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}  onChangeText={(password) => this.setState({password})} />
                <Button onPress={ () => this.onSignIn()} title="Sign in" />
                {
                    this.state.loading ? <ActivityIndicator style={{marginVertical:20}} /> : null
                }
            </Card>
        )
    }
}

export default Login2

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor:'#DCDCDC',
        padding: 10,
        borderRadius:4,
    },
    view: {
        flex:1,
        marginHorizontal:50,
        marginVertical:50,
        borderRadius:5,
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginVertical:5,
        marginHorizontal:5,
    }
})
