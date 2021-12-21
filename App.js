import React, {useState, useEffect, useRef} from 'react';
import {StatusBar} from 'expo-status-bar'
import { View, ActivityIndicator, Dimensions,Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home,Details, Account,Explorer,ResetPassword, ExplorerDetails, Login, Register, SearchResults, SearchResultsByCategory } from "./pages"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {initializeApp} from 'firebase/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

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

function AccountStackScreensNotLoggedIn() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Login"  options={{title: 'Connexion'}} component={Login} />
      <AccountStack.Screen name="Register"  options={{title: 'Inscription'}} component={Register} />
      <AccountStack.Screen name="ResetPassword"  options={{title: 'Mot de passe oublié'}} component={ResetPassword} />
    </AccountStack.Navigator>
  )
}

function AccountStackScreensLoggedIn() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account"  options={{title: 'Compte'}} component={Account} />
    </AccountStack.Navigator>
  )
}

function ExplorerStackScreens() {
  return(
    <ExplorerStack.Navigator>
      <ExplorerStack.Screen name="Explorer" component={Explorer} />
      <ExplorerStack.Screen name="SearchResults"  options={{title: 'Résultats'}} component={SearchResults} />
      <ExplorerStack.Screen name="SearchResultsByCategory"  options={{title: 'Résultats par genre'}} component={SearchResultsByCategory} />
      <ExplorerStack.Screen name="ExplorerDetails"  options={{title: 'Détails'}} component={ExplorerDetails} />
    </ExplorerStack.Navigator>
  )
}

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" options={{title: 'Détails'}} component={Details} />
    </HomeStack.Navigator>
  )
}

export default function App(props) {

  const[loaded, setLoaded] = useState(false)
  const[loggedIn, setLoggedIn] = useState(false)  
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  function getWidth() {
    let width = Dimensions.get("window").width
    return width /3
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(!user) {
        setLoggedIn(false)
        setLoaded(true)
      }
      else {
        setLoggedIn(true)
        setLoaded(true)
      }
    })
  },[]);

  if(!loaded) {
    return(
      <View>
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {backgroundColor: '#21252b', color: 'white', height:80},
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false,
          tabBarShowLabel:false
        })}>
          <Tab.Screen
            name="HomeTab"
            component={HomeStackScreens}
            options={{
              title:'Home',
              headerStyle: {
                backgroundColor: '#21252b',
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
          )}} listeners={({navigation,route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver:false,
              }).start()
            }
          })} />
          <Tab.Screen
            name="ExplorerTab"
            component={ExplorerStackScreens}
            options={{
              title: 'Explorer',
              headerStyle: {
                backgroundColor: '#21252b',
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
          )}} listeners={({navigation,route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver:false,
              }).start()
            }
          })} />
          <Tab.Screen 
            name="AccountTab"
            component={ loggedIn ? AccountStackScreensLoggedIn : AccountStackScreensNotLoggedIn}
            options={{
              title: 'Compte',
              headerStyle: {
                backgroundColor: '#21252b',
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
          )}} listeners={({navigation,route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth()*2,
                useNativeDriver:false,
              }).start()
            }
          })} />
        </Tab.Navigator>
        <Animated.View style={{width:getWidth(), height:100, backgroundColor:'tomato', position:'absolute', bottom: 78, height: 2, borderRadius:'50%', transform: [ {translateX: tabOffsetValue}]}}></Animated.View>
        <StatusBar style="auto"/>
      </NavigationContainer>
    </Provider>
  )
}
