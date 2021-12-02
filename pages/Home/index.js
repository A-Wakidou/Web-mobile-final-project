import React, {useEffect, useState} from "react"
import { View,Text, StyleSheet,FlatList, ActivityIndicator, Image } from "react-native"

const Home = ({navigation}) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMangas = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&limit=4');
      const json = await response.json()
      console.log(json.results)
      setData(json.results);
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
    <View style={{ padding:24}}>
      <Text style={{fontWeight:'bold', fontSize:25,marginBottom:15}}>Les plus populaires</Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          numColumns="2"
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View>
              {/*<Text style={{marginBottom:40}}>{item.title}</Text>*/}
              <Image style={{ width:200, height:270, marginBottom:1,marginRight:1}} source={{uri:item.image_url}} />
            </View>
          )}
        />
      )}
      <Text style={{fontWeight:'bold', fontSize:25,marginBottom:10, marginTop:20}}>Prochaines sorties</Text>
    </View>
  )
}
export default Home