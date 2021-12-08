import React from 'react'
import { SafeAreaView,View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import Card from '../../components/card'

export default function searchResults({route, navigation}) {
    function addOnFavorites(malId) {
      console.log(malId)
    }
    const {data} = route.params
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item) => item.mal_id}
            renderItem={({ item }) => (
              <View style={{flex: 1}}>
                <Card style={{flex:1, flexDirection:'row'}}>
                    <Image style={{ width:180, height:200, borderRadius:5}} source={{uri:item.image_url}} />
                    <View style={{flex:1,marginTop:10, marginLeft:15}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                        <Text style={{fontStyle:'italic', color:'tomato', fontSize:'15', marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                        <View style={{flex:1, marginTop:10}}>
                          <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                          <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                          <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                          <TouchableOpacity style={{flex:1}} onPress={() => navigation.navigate('ExplorerDetails', {item})}>
                            <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>En savoir pl </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{flex:1}} onPress={addOnFavorites(item.mal_id)}>
                            <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}> Ajouter aux favoris </Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                </Card>
              </View>
            )}
          />
        </SafeAreaView>
    )
}
