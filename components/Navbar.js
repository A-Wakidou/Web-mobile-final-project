import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

export default function Navbar() {
    return (
        <View style={styles.navbar}>
            <View>
                <Text>MangaDiscover</Text>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo.jpg')}
                />
            </View>
            <Text>Connexion</Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    navbar: {
      paddingTop:90,
      paddingBottom: 10,
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      paddingLeft: 10,
      paddingRight:10,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e5e5'
    },
    logo: {
        width:50,
        height:50,
        borderRadius:10
    }
  });
  