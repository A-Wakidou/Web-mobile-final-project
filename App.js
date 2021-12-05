import React, {Component} from 'react';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home,Details, Account,Explorer, ExplorerDetails, Login2, Register2 } from "./pages"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import MainScreen from'./pages'
const store = createStore(rootReducer, applyMiddleware(thunk))

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
const HomeStack = createNativeStackNavigator()
const ExplorerStack = createNativeStackNavigator()

function AccountStackScreens() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account Informations" component={MainScreen} />
      <AccountStack.Screen name="Register" component={Register2} />
    </AccountStack.Navigator>
  )
}

function ExplorerStackScreens() {
  return(
    <ExplorerStack.Navigator>
      <ExplorerStack.Screen name="Explorer" component={Explorer} />
      <ExplorerStack.Screen name="ExplorerDetails" component={ExplorerDetails} />
    </ExplorerStack.Navigator>
  )
}

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
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
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown:false
            })}>
              <Tab.Screen
                name="Homes"
                component={HomeStackScreens}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
              )}} />
              <Tab.Screen
                name="Explorer"
                component={ExplorerStackScreens}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size} />
              )}} />
              <Tab.Screen 
                name="Account"
                component={ loggedIn ? AccountStackScreens : Account}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
              )}} />
            </Tab.Navigator>
            <StatusBar style="auto"/>
          </NavigationContainer>
        </Provider>
      )
  }
}

export default App

const styles = StyleSheet.create({

});
