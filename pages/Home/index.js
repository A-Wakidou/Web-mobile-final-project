import React, {useEffect, useState} from "react"
import { View,Text, StyleSheet,FlatList, ActivityIndicator, Image } from "react-native"

const Home = ({navigation}) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMangas = async () => {
    try {
      const response = await fetch('https://kitsu.io/api/edge/anime?filter[text]=cowboy%20bebop');
      const json = await response.json()
      console.log(json.data)
      setData(json.data);
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
    <View style={{ flex:1, padding:24}}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <div style={{flex:1}}>
              <Text style={{marginBottom:40}}>{item.attributes.canonicalTitle}</Text>
              <Image style={{flex:1, width:100, height:100}} source={item.attributes.posterImage.tiny} />
            </div>

          )}
        />
      )}
    </View>
  )
}
export default Home