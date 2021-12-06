import React from 'react'
import { ScrollView,SafeAreaView, View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import Card from '../../components/card'

export default function searchResults({route, navigation}) {
    const {data} = route.params
    const categoryId = route.params.category
    var category =''
    if(categoryId == 27) {
        category = 'Shônen'
    }
    else if (categoryId == 42) {
        category = 'Seinen'
    }
    else if(categoryId ==25) {
        category = "Shojo"
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
    console.log(data)
    return (
      <View style={{backgroundColor:'white'}}>
        <Text style={{fontWeight:'bold', fontSize:20, marginLeft:5,marginBottom:15,marginTop:15}}>Catégorie {category} </Text>
        <SafeAreaView style={{marginTop:10}}>
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
                      <Text style={{fontStyle:'italic', color:'tomato', fontSize:15, marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
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
        </SafeAreaView>
      </View>
    )
}
