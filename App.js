import React, {Component} from 'react';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home,Account,Explorer, Login, Register2, AccountInformations } from "./pages"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDRSx-LtMPYklEzpTgNb2sJZsE_zmAico4",
  authDomain: "webmobilefinalproject.firebaseapp.com",
  projectId: "webmobilefinalproject",
  storageBucket: "webmobilefinalproject.appspot.com",
  messagingSenderId: "696135217813",
  appId: "1:696135217813:web:8a2c9c8e7d6e143f86a19c"
};

const app = initializeApp(firebaseConfig)

const Tab = createBottomTabNavigator()
const AccountStack = createNativeStackNavigator()

function AccountStackScreens() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Register" component={Register2} />
      {/*<AccountStack.Screen name="Login" component={Login} />
      <AccountStack.Screen name="AccountInformations" component={AccountInformations} /> */}
    </AccountStack.Navigator>
  )
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded:true
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded } = this.state
    if(!loaded) {
      return(
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
            )}} />
            <Tab.Screen
              name="Explorer"
              component={Explorer}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="magnify" color={color} size={size} />
            )}} />
            <Tab.Screen 
              name="Account"
              component={AccountStackScreens}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
            )}} />
          </Tab.Navigator>
          <StatusBar style="auto"/>
        </NavigationContainer>
      )}
      else {
        return (
          <View>
            <AccountInformations />
          </View>
        )
      }
  }
}

export default App

const styles = StyleSheet.create({

});
