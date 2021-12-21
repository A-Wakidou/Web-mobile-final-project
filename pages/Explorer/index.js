import React, {useState, useEffect} from "react"
import { ScrollView,StatusBar, SafeAreaView, View,Text,TextInput, StyleSheet, Button, FlatList,Image, TouchableOpacity, Keyboard, ActivityIndicator} from "react-native"

const Explorer = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const search = async () => {
    if(!text){
      return null
    }
    try {
      Keyboard.dismiss()
      setLoading(true);
      const response = await fetch('https://api.jikan.moe/v3/search/manga?q='+text+'&limit=30');
      const json = await response.json()
      const data = json.results
      setLoading(false);
      navigation.navigate('SearchResults', {data:data, text:text})
    } catch (error) {
      console.error(error);
    }
  }

  const categoriesList = [
    {
      id:27,
      name:'Shônen',
      japName:'少年',
      backgroundColor:'#FF5A5F'
    },
    {
      id:42,
      name:'Seinen',
      japName:'青年',
      backgroundColor:'#FEEFDD'
    },
    {
      id:25,
      name:'Shojo',
      japName:'少女',
      backgroundColor:'#F3B3A6'
    },    {
      id:1,
      name:'Action',
      japName:'アクション',
      backgroundColor:'#BFD7EA'
    },    {
      id:2,
      name:'Aventure',
      japName:'冒険',
      backgroundColor:'#B4C5E4'
    },    {
      id:30,
      name:'Sport',
      japName:'スポーツ',
      backgroundColor:'#E8F7EE'
    },    {
      id:4,
      name:'Comédie',
      japName:'コメディ',
      backgroundColor:'#B1B7D1'
    },
    {
      id:10,
      name:'Fantasy',
      japName:'ファンタジー',
      backgroundColor:'#B2EDC5'
    },
    {
      id:14,
      name:'Horreur',
      japName:'ホラー',
      backgroundColor:'#CFF27E'
    }
  ]

  return (
    <View style={{flex:1,backgroundColor:'#fff', paddingHorizontal:10, paddingTop:20 }}>
      <Text style={{marginLeft:10, fontWeight:'bold', fontSize:15}}>Rechercher un anime</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemple: Naruto, One piece..."
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button title="Valider" onPress={(search)} />
      <View style={{paddingVertical:8, marginTop:20, marginBottom:10, paddingBottom:15, backgroundColor:'#21252b',borderRadius:4}}>
          <Text style={{marginLeft:10, fontWeight:'bold',color:'white', fontSize:20}}>Catégories :</Text>
      </View>
      {isLoading ? <ActivityIndicator style={{marginVertical:10}}/> : null}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={categoriesList}
          numColumns="2"
          renderItem={({ item }) => (
            <TouchableOpacity style={{width:'49%', marginVertical:5, marginRight:5}} onPress={() => {
              const searchByCategory = async () => {
                setLoading(true)
                try {
                  const response = await fetch('https://api.jikan.moe/v3/search/anime?q=&limit=20&genre='+item.id+'&order_by=score');
                  const json = await response.json()
                  const data = json.results
                  setLoading(false);
                  navigation.navigate('SearchResultsByCategory', {data:data, category:item.id})
                } catch (error) {
                  console.error(error);
                } finally {
                }
              }
              searchByCategory()
            }}>
            <View
              style={{
                flex:1,
                justifyContent:'center',
                height:100,
                borderRadius:5,
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowColor: '#333',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                backgroundColor:item.backgroundColor
              }}
            >
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.japName}</Text>
            </View>
          </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
    </View>
  )
}

export default Explorer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    marginVertical:10,
    borderWidth: 1,
    borderColor:'#DCDCDC',
    padding: 10,
    borderRadius:4,
  },
  cardText: {
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  }
})