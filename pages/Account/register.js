import React, {useState} from 'react'
import { View,  Button,Text, TextInput,ActivityIndicator, StyleSheet, Keyboard} from 'react-native'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore"
import Card from '../../components/card'
import {fetchUser} from '../../redux/actions'
import { bindActionCreators} from 'redux'
import {connect} from 'react-redux'

function Register(props) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [displayName, setDisplayName] = useState()
    const [loading, setLoading] = useState(false)
    const [errorFetch, setErrorFetch] = useState()

    function onSignUp() {
        Keyboard.dismiss()
        setLoading(true)
        const db = getFirestore();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then( (result) => {
                updateProfile(auth.currentUser, {
                    displayName: displayName
                })
                    .then( () => {
                        props.fetchUser()
                        try {
                            addDoc(collection(db, "users"), {
                                email:result.user.email,
                                displayName:displayName,
                                uid: result.user.uid
                            })
                            setLoading(false)
                        } 
                        catch (e) {
                            console.error("Error adding document: ", e);
                            setLoading(false)
                            setErrorFetch(error.code)
                        }
                    })
            })
            .catch( (error) => {
                console.log(error)
                setLoading(false)
                setErrorFetch(error.code)
            })

    }
    return (
        <Card style={styles.card}>
            <View style={styles.view}>
                <TextInput style={styles.input} placeholder="Name" onChangeText={(displayName) => setDisplayName(displayName)} />
                <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => setEmail(email)} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}  onChangeText={(password) => setPassword(password)} />
                <Button onPress={ () => onSignUp()} title="Sign up" />
                { errorFetch ?<Text style={{textAlign:'center', color:'red', marginVertical:5}}>Erreur: {errorFetch} </Text> : null }
                {
                    loading ? <ActivityIndicator style={{marginVertical:20}} /> : null
                }
            </View>
        </Card>
    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(null, mapDispatchProps)(Register)

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

