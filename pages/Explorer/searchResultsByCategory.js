import React from 'react'
import { SafeAreaView, View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import Card from '../../components/card'

export default function searchResults({route, navigation}) {

  const {data} = route.params
  const categoryId = route.params.category
  var category =''
  if(categoryId == 27) {
      category = 'Shônens'
  }
  else if (categoryId == 42) {
      category = 'Seinens'
  }
  else if(categoryId ==25) {
      category = "Shojos"
  }
  else if(categoryId ==1) {
      category = "Action"
  }
  else if(categoryId ==2) {
      category = "Aventure"
  }
  else if(categoryId ==30) {
      category = "Sport"
  }
  else if(categoryId ==4) {
      category = "Comédie"
  }
  else if(categoryId ==10) {
      category = "Fantasy"
  }
  else if(categoryId ==14) {
      category = "Horreur"
  }
  return (
    <View style={{flex:1, padding:10, backgroundColor:'white'}}>
      <View style={{paddingVertical:8, backgroundColor:'#21252b',borderRadius:4, marginVertical:10}}>
        <Text style={{ width:'60%', padding:5, marginLeft:8, fontWeight:'bold',color:'white', fontSize:20, borderWidth:1, borderColor:'white'}}>Genre: <Text style={{color:'tomato'}}> {category}</Text></Text>
      </View>
      <SafeAreaView style={{flex:1}}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={{flex:1}}>
                <View style={{flex: 1, flexDirection:'row'}}>
                  <Image style={{ width:180, height:300, borderRadius:5}} source={{uri:item.image_url}} />
                  <View style={{flex:1,marginTop:10, marginLeft:15}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{fontStyle:'italic', color:'tomato', fontSize:15, marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                    <View style={{flex:1, marginTop:10}}>
                      <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                      <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                      <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                      <TouchableOpacity onPress={() => navigation.navigate('ExplorerDetails', {item})}>
                        <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>En savoir plus</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { console.log(item.mal_id)}}>
                        <Text style={{fontWeight:'bold', color:'tomato', marginTop:5, textDecorationLine:'underline'}}>Ajouter aux favoris</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{flex:1, alignItems:'center'}}>
                  <View style={{flex:1, borderBottomColor: '#E7E7E7', marginVertical:5,width:'100%', borderBottomWidth:1}}/>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
    </View>
  )
}
