import React, {useState, useEffect} from "react"
import { ScrollView, View,Text,TextInput, StyleSheet, Button, FlatList,Image, TouchableOpacity} from "react-native"
import Card from '../../components/card'
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
    <View style={{flex:1,backgroundColor:'#fff'}}>
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
                <Card>
                  <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={() => navigation.navigate('ExplorerDetails', {item})}>
                    <Image style={{ width:180, height:200, borderRadius:5}} source={{uri:item.image_url}} />
                    <View style={{flex:1,marginTop:10, marginLeft:15}}>
                      <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                      <Text style={{fontStyle:'italic', color:'tomato', fontSize:'15', marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                      <View style={{flex:1, marginTop:10}}>
                        <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                        <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                        <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                        <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>En savoir plus </Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                </Card>
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
    borderColor:'#DCDCDC',
    padding: 10,
    borderRadius:4,
  }
})