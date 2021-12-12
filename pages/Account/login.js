import React, { useState } from 'react'
import { Button, View, TextInput, StyleSheet, ActivityIndicator, Text, TouchableOpacity} from 'react-native'
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import Card from '../../components/card'
import {fetchUser} from '../../redux/actions'
import { bindActionCreators} from 'redux'
import {connect} from 'react-redux'

function Login(props) {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorFetch, setErrorFetch] = useState()

    function onSignIn() {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( (result) => {
                props.fetchUser()
                console.log('LoggedIn')
                setLoading(false)
            })
            .catch( (error) => {
                setLoading(false)
                setErrorFetch(error.code)
            })
    }

    return (
        <Card style={styles.card}>
            <View style={styles.view}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input} placeholder="Votre email" onChangeText={(email) => setEmail(email)} />
                <Text style={styles.text}>Mot de passe</Text>
                <TextInput style={styles.input} placeholder="Votre mot de passe" secureTextEntry={true}  onChangeText={(password) => setPassword(password)} />
                { errorFetch ?<Text style={{textAlign:'center', color:'red', marginVertical:5}}>Erreur: {errorFetch} </Text> : null }
            <Button onPress={onSignIn} title="Valider" />
            <View style={{marginVertical:10}}>
                <TouchableOpacity style={{marginVertical:2, color:'tomato', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}} onPress={ () => navigation.navigate('Register')}><Text>Inscription</Text></TouchableOpacity>
                <TouchableOpacity style={{marginVertical:2, color:'tomato', textAlign:'center', fontWeight:'bold', textDecorationLine:'underline'}} onPress={ () => navigation.navigate('ResetPassword')}><Text>Mot de passe oublié </Text></TouchableOpacity>
            </View>
            {
                loading ? <ActivityIndicator style={{marginVertical:20}} /> : null
            }
            </View>
        </Card>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentUserFavorites: store.userState.currentUserFavorites
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Login)

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
