import React, {useEffect, useState} from "react"
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ActivityIndicator, Image, ScrollView } from "react-native"
import Carousel from '../../components/carousel'

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

  function onPress() {
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:24}}>
      <ScrollView>
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
      </ScrollView>
    </View>
  )
}
export default Home