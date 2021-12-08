import React, { Component } from 'react'
import { View, Text,Button, ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {fetchUser} from '../../redux/actions'
import {getAuth, signOut} from 'firebase/auth'
import Card from '../../components/card'

const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate('Login')
    }).catch((error) => {
      console.log(error)
    })
}

export class index extends Component {
    componentDidMount() {
        this.props.fetchUser()
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
                        <TouchableOpacity style={{marginVertical:5, padding:5, textAlign:'center', fontWeight:'bold', backgroundColor:'tomato', borderRadius:4}} onPress={logOut}><Text style={{color:'white'}}>Déconnexion</Text></TouchableOpacity>
                    </View>
                </Card>
                <Card>
                    <View style={styles.card}>
                        <Text style={styles.title}>Favoris</Text>
                        <Text>Vos animes mis en favoris apparaîtront ici</Text>
                        <TouchableOpacity style={{marginVertical:5, padding:5, color:'tomato', textAlign:'center', fontWeight:'bold', backgroundColor:'blue', borderRadius:4}} onPress={() => {this.props.navigation.navigate('ExplorerTab')}}><Text style={{color:'white'}}>Ajouter des animes en favoris</Text></TouchableOpacity>
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