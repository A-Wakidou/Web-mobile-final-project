import React, {useState} from 'react'
import { ScrollView, View, Text,StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native'
import {getAuth, signOut} from 'firebase/auth'
import {doc,getDocs,collection, deleteDoc,getFirestore} from 'firebase/firestore'
import Card from '../../components/card'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {deleteFromFavorites} from '../../redux/actions/deleteFavorites'
import {userLogOut} from '../../redux/actions/userLogOut'

function index (props){

    const auth = getAuth()
    const db = getFirestore()
    const [modalVisible, setModalVisible] = useState(false)

    function logOut () {
        props.userLogOut()
        signOut(auth)
            .catch((error) => {
            console.log(error)
            })
    }

    async function deleteDocument (docId) {
        await deleteDoc(doc(db, "favorites", docId))
    }

    async function deleteFavorite(item, i) {
        const querySnapshot = await getDocs(collection(db, "favorites"));
        querySnapshot.forEach((doc) => {
            if(doc.data().mal_id == item.mal_id && doc.data().uid == auth.currentUser.uid) {
                deleteDocument(doc.id.toString())
                props.deleteFromFavorites(i)
            }
            else {
                'Pas de favoris à supprimer'
            }
        })
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
                    <Text style={{fontSize:16}}> <Text style={{fontWeight:'bold'}}>Email: </Text> {auth.currentUser.email} </Text>
                    <Text style={{fontSize:16,marginBottom:10}}> <Text style={{fontWeight:'bold'}}>Nom d'utilisateur: </Text> {auth.currentUser.displayName}</Text>
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
                        props.currentUserFavorites.length > 0 ?
                        props.currentUserFavorites.map( (item, i) => {
                            return (
                                <View key={i} style={{flex:1}}>
                                    <View style={{alignItems:'center', height:300, marginVertical:10}}>
                                        <Pressable style={{width:'50%', height:150, shadowColor: '#000', shadowOffset: {width: 0,height: 2,}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                                            <Image style={{flex:1}}  source={{uri:item.image_url}}/>
                                        </Pressable>
                                        <Text style={{textAlign:'center', marginVertical:10, fontStyle:'italic', fontWeight:'bold'}}>{item.title}</Text>
                                        <TouchableOpacity style={{width:'50%',marginVertical:5, padding:5, fontWeight:'bold', backgroundColor:'#373F51', borderRadius:4}} onPress={ () => setModalVisible(true) }><Text style={{textAlign:'center', color:'white'}}>Activer les notifications</Text></TouchableOpacity>
                                        <TouchableOpacity style={{width:'50%',marginVertical:5, padding:5, fontWeight:'bold', backgroundColor:'#373F51', borderRadius:4}} onPress={ () => setModalVisible(true) }><Text style={{textAlign:'center', color:'white'}}>Actualité - Communauté</Text></TouchableOpacity>
                                        <TouchableOpacity style={{width:'50%',marginVertical:5, padding:5, fontWeight:'bold', backgroundColor:'#ff2919', borderRadius:4}} onPress={() => deleteFavorite(item, i)}><Text style={{textAlign:'center', color:'white'}}>Retirer</Text></TouchableOpacity>
                                    </View>
                                    <View style={{flex:1, borderBottomColor: '#E7E7E7', marginTop:10, marginBottom:20, borderBottomWidth:1, width:'100%'}}/>
                                </View>
                            )
                        })
                        :
                        <Text>Vos animes ajoutés en favoris apparaîtront ici</Text>
                        :
                        <Text>Vos animes ajoutés en favoris apparaîtront ici</Text>
                    }
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTextTop}>Fonctionnalité disponible prochainement.</Text>
                            <Text style={styles.modalText}>Soyez informé des dates de sorties et de l'actu de vos mangas préférés !</Text>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => {
                                setModalVisible(!modalVisible)
                                }
                            }>
                            <Text style={styles.textStyle}>Masquer</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={{marginVertical:15, padding:5, color:'tomato', fontWeight:'bold', backgroundColor:'deepskyblue', borderRadius:4}} onPress={() => {props.navigation.navigate('ExplorerTab')}}><Text style={{color:'white',textAlign:'center'}}>Ajouter</Text></TouchableOpacity>
                </View>
            </Card>
        </ScrollView>
    )
}

const mapStateToProps = (store) => ({
    currentUserFavorites: store.userState.currentUserFavorites
})

const mapDispatchProps = (dispatch) => bindActionCreators({deleteFromFavorites,userLogOut}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(index)

const styles = StyleSheet.create({
    card:{
        padding:20
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:30,
        textAlign:'center'
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
    modalTextTop: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight:'bold',
        fontSize:14,
        color:'tomato'
    },
    modalText: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight:'bold',
        fontSize:12
    }
})