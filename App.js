import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navbar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    paddingTop:90,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingLeft: 10,
    paddingRight:10
  }
});
