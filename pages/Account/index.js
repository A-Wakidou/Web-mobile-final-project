import React, { Component } from 'react'
import { View, Text,Button, ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {fetchUser} from '../../redux/actions'
import {getAuth, signOut} from 'firebase/auth'
import {getDocs, getFirestore, collection} from 'firebase/firestore'
import Card from '../../components/card'

export class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.props.fetchUser()
    }

    logOut () {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log('LogOut')
        }).catch((error) => {
          console.log(error)
        })
    }

    render() {
        const {currentUser} = this.props
        console.log(currentUser)
        if(currentUser==undefined) {
            return(
                <View></View>
            )
        }
        return (
            <View>
                <Card>
                    <View style={styles.card}>
                        <Text style={styles.title}>Informations du compte</Text>
                        <Text> <Text>Email: </Text> {currentUser.email}</Text>
                        <Text> <Text>Nom d'utilisateur: </Text> {currentUser.displayName}</Text>
                        <TouchableOpacity style={{marginVertical:15, padding:5, fontWeight:'bold', backgroundColor:'tomato', borderRadius:4}} onPress={() => this.logOut()}><Text style={{textAlign:'center', color:'white'}}>Déconnexion</Text></TouchableOpacity>
                    </View>
                </Card>
                <Card>
                    <View style={styles.card}>
                        <Text style={styles.title}>Favoris</Text>
                        <Text>Vos animes mis en favoris apparaîtront ici</Text>
                        <TouchableOpacity style={{marginVertical:15, padding:5, color:'tomato', fontWeight:'bold', backgroundColor:'deepskyblue', borderRadius:4}} onPress={() => {this.props.navigation.navigate('ExplorerTab')}}><Text style={{color:'white',textAlign:'center'}}>Ajouter</Text></TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(index)

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