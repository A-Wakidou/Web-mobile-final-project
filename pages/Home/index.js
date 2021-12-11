import React, {useEffect, useState} from "react"
import { View,SafeAreaView, Text, TouchableOpacity, StyleSheet,FlatList, ActivityIndicator, Image } from "react-native"

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
  }, []);

  return (
    <View style={{ flex:1, backgroundColor:'#fff', justifyContent:'center', padding:15, paddingTop:20}}>
        <View style={{paddingVertical:8, backgroundColor:'#21252b',borderRadius:4, marginBottom:30}}>
          <Text style={{ width:'60%', padding:5, marginLeft:8, fontWeight:'bold',color:'white', fontSize:20, borderWidth:1, borderColor:'white'}}>Top prochaines sorties</Text>
        </View>
        {isLoading ? <ActivityIndicator/> : (
        <SafeAreaView style={{flex:1}}>
          <FlatList
            numColumns="2"
            data={data}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={{flex: 1}}>
                <TouchableOpacity style={{alignItems:'center',}} onPress={() => navigation.navigate('Details', {item})}>
                  <Image style={{ width:'70%', height:200}} source={{uri:item.image_url}} />
                  <Text style={{fontStyle:'italic', fontSize:12,textAlign:'center', fontWeight:'bold',paddingVertical:5}}>{item.title}</Text>
                  <Text style={{fontSize:10,fontStyle:'italic', color:'tomato'}}>{item.start_date ? item.start_date : 'Date dévoilée prochainement'}</Text>
                  <View style={{flex:1, borderBottomColor: '#E7E7E7', marginTop:10, marginBottom:20, borderBottomWidth:1, width:'80%'}}/>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
        )}
    </View>
  )
}
export default Home