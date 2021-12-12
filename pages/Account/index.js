import React, { useEffect } from 'react'
import { ScrollView, View, Text,Button, ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native'
import {getAuth, signOut} from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import Card from '../../components/card'
import {connect} from 'react-redux'

function index (props){

    const auth = getAuth();

    function logOut () {
        signOut(auth).then(() => {
          console.log('LogOut')
        }).catch((error) => {
          console.log(error)
        })
    }
    
    //const currentUser = props.currentUser
    const currentUserFavorites = props.currentUserFavorites

    if(auth.currentUser==undefined) {
        return(
            <View></View>
        )
    }
    return (
        <ScrollView>
            <Card>
                <View style={styles.card}>
                    <Text style={styles.title}>Informations du compte</Text>
                    <Text> <Text>Email: </Text> {auth.currentUser.email}</Text>
                    <Text> <Text>Nom d'utilisateur: </Text> {auth.currentUser.displayName}</Text>
                    <TouchableOpacity style={{marginVertical:15, padding:5, fontWeight:'bold', backgroundColor:'tomato', borderRadius:4}} onPress={() => logOut()}><Text style={{textAlign:'center', color:'white'}}>Déconnexion</Text></TouchableOpacity>
                </View>
            </Card>
            <Card>
                <View style={styles.card}>
                    <Text style={styles.title}>Favoris</Text>
                    <Text>Vos animes mis en favoris apparaîtront ici</Text>
                    {
                        currentUserFavorites ?
                        props.currentUserFavorites.map( (value, i) => {
                            return (
                                <Text key={i}>{value.animeName}</Text>
                            )
                        })
                        :
                        null
                    }
                    <TouchableOpacity style={{marginVertical:15, padding:5, color:'tomato', fontWeight:'bold', backgroundColor:'deepskyblue', borderRadius:4}} onPress={() => {props.navigation.navigate('ExplorerTab')}}><Text style={{color:'white',textAlign:'center'}}>Ajouter</Text></TouchableOpacity>
                </View>
            </Card>
        </ScrollView>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    currentUserFavorites: store.userState.currentUserFavorites
})

export default connect(mapStateToProps)(index)

const styles = StyleSheet.create({
    card:{
        padding:20
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        marginVertical:5
    }
})