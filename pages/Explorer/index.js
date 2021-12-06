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
      navigation.navigate('SearchResults', {data})
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
    <View style={{flex:1,backgroundColor:'#fff', paddingHorizontal:5}}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un anime"
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button title="Valider" onPress={(search)} />
      <Text style={{fontWeight:'bold', fontSize:20, marginLeft:5,marginBottom:15,marginTop:15}}>Catégories</Text>
      {isLoading ? <ActivityIndicator style={{marginVertical:10}}/> : null}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={categoriesList}
          numColumns="2"
          renderItem={({ item }) => (
            <View
              style={{
                width: '47%',
                height:100,
                borderRadius:5,
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowColor: '#333',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginVertical:5,
                marginHorizontal:5,
                backgroundColor:item.backgroundColor
              }}
            >
                <TouchableOpacity onPress={() => {
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
                  <Text style={styles.cardText}>{item.name}</Text>
                  <Text style={styles.cardText}>{item.japName}</Text>
                </TouchableOpacity>
              </View>
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
    margin: 12,
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