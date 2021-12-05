import React, {useState, useEffect} from "react"
import { ScrollView, View,Text,TextInput, StyleSheet, Button, FlatList,Image, TouchableOpacity} from "react-native"
//import Card from '../../components/card'
const Explorer = ({navigation}) => {

  const [text, setText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMangas = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/search/manga?q='+text+'&limit=10');
      const json = await response.json()
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function search() {
    getMangas()
  }

  return (
    <View style={{flex:1}}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un anime"
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button title="Valider" onPress={search} />
      {console.log(data)}
      <ScrollView style={{marginTop:10}}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <View style={{flex: 1}}>
                  <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={() => navigation.navigate('Details', {item})}>
                    <Image style={{ width:180, height:150}} source={{uri:item.image_url}} />
                    <Text style={{fontSize:12, fontWeight:'bold',marginTop:5, marginLeft:10, marginBottom:20}}>{item.title}</Text>
                  </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
    </View>
  )
}

export default Explorer

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})