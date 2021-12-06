import React, {useEffect, useState} from "react"
import { View,SafeAreaView, Text, TouchableOpacity, StyleSheet,FlatList, ActivityIndicator, Image, ScrollView } from "react-native"

const Home = ({navigation}) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMangas = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/top/anime/1/upcoming');
      const json = await response.json()
      setData(json.top);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMangas()
  }, [])

  return (
    <View style={{ flex:1, backgroundColor:'#fff', justifyContent:'center', padding:24}}>
      <SafeAreaView>
        <Text style={{fontWeight:'bold', fontSize:25,marginBottom:25, marginTop:20}}>Top prochaines sorties</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            numColumns="2"
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', {item})}>
                  <Image style={{ width:180, height:150}} source={{uri:item.image_url}} />
                  <Text style={{fontSize:12, fontWeight:'bold',marginTop:5, marginBottom:20}}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </View>
  )
}
export default Home