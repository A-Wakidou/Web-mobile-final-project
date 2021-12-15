import React, { useEffect } from 'react'
import { ScrollView, View, Text,Button, ActivityIndicator,StyleSheet, Image, TouchableOpacity } from 'react-native'
import {getAuth, signOut} from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import Card from '../../components/card'
import {connect} from 'react-redux'

function index (props){

    const auth = getAuth();
    console.log(props)
    function logOut () {
        signOut(auth).then(() => {
          console.log('LogOut')
        }).catch((error) => {
          console.log(error)
        })
    }

    function deleteFavorite() {
        console.log('delete')
    }
    
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
                    <Text style={{fontSize:16}}> <Text style={{fontWeight:'bold'}}>Email: </Text> {props.currentUser.email}</Text>
                    <Text style={{fontSize:16,marginBottom:10}}> <Text style={{fontWeight:'bold'}}>Nom d'utilisateur: </Text> {props.currentUser.displayName}</Text>
                    <Card style={{marginVertical:30}}>
                        <TouchableOpacity style={{marginVertical:5, fontWeight:'bold', borderRadius:4}} onPress={() => logOut()}><Text style={{textAlign:'center',fontWeight:'bold'}}>Déconnexion</Text></TouchableOpacity>
                    </Card>
                </View>
            </Card>
            <Card>
                <View style={styles.card}>
                    <Text style={styles.title}>Favoris</Text>
                    {
                        props.currentUserFavorites ?
                        props.currentUserFavorites.map( (value, i) => {
                            return (
                                <View style={{flex:1}}>
                                    <View style={{flex:1, alignItems:'center', height:270, marginVertical:10}}>
                                        <Image style={{width:'50%', height:150}} source={{uri:value.animeImg}}/>
                                        <Text style={{textAlign:'center', marginVertical:10, fontStyle:'italic', fontWeight:'bold'}}>{value.animeName || value.title}</Text>
                                        <TouchableOpacity style={{width:'50%',marginVertical:5, padding:5, fontWeight:'bold', backgroundColor:'#373F51', borderRadius:4}} onPress={() => deleteFavorite(value)}><Text style={{textAlign:'center', color:'white'}}>Activer les notifications</Text></TouchableOpacity>
                                        <TouchableOpacity style={{width:'50%',marginVertical:5, padding:5, fontWeight:'bold', backgroundColor:'#ff2919', borderRadius:4}} onPress={() => deleteFavorite(value)}><Text style={{textAlign:'center', color:'white'}}>Retirer</Text></TouchableOpacity>
                                    </View>
                                    <View style={{flex:1, borderBottomColor: '#E7E7E7', marginTop:10, marginBottom:20, borderBottomWidth:1, width:'80%'}}/>
                                </View>
                            )
                        })
                        :
                        <Text>Vos animes mis en favoris apparaîtront ici</Text>
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
        marginBottom:30,
        textAlign:'center'
    }
})