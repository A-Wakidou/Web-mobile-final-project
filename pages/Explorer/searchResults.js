import React from 'react'
import { ScrollView,View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import Card from '../../components/card'

export default function searchResults({route, navigation}) {
    const {data} = route.params
    console.log(data)
    return (
        <ScrollView style={{marginTop:10}}>
        <FlatList
          data={data}
          extraData={data}
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
    )
}
