export { default as Home } from "./Home"
export { default as Details } from './Home/details'
export { default as Explorer } from "./Explorer"
export { default as Account } from "./Account"
export { default as Login2 } from "./Account/login2"
export { default as Register } from "./Account/register"
export { default as Register2 } from "./Account/register2"

import React, { Component } from 'react'
import { View, Text,Button } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {fetchUser} from '../redux/actions'
import {getAuth, signOut} from 'firebase/auth'

const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate('Login')
    }).catch((error) => {
      console.log(error)
    });
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
                <Text>Account informations</Text>
                <Text>{currentUser.email}</Text>
                <Button onPress={logOut} title="Sign out"/>
            </View>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(index)
