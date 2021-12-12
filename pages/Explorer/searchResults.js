import React, { useState, useEffect } from 'react'
import { SafeAreaView,View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

function searchResults(props) {

    const data = props.route.params.data
    const text = props.route.params.text
    const currentUserFavorites = props.currentUserFavorites

    return (
      <View style={{flex:1, padding:10, backgroundColor:'white'}}>
        <View style={{paddingVertical:8, backgroundColor:'#21252b',borderRadius:4, marginVertical:10}}>
          <Text style={{ width:'60%', padding:5, marginLeft:8, fontWeight:'bold',color:'white', fontSize:20, borderWidth:1, borderColor:'white'}}>Recherche: <Text style={{color:'tomato'}}> {text}</Text></Text>
        </View>
        <SafeAreaView style={{flex:1}}>
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item) => item.mal_id}
          renderItem={({ item }) => (
            <View style={{flex:1}}>
              <View style={{flexDirection:'row'}}>
                <Image style={{ width:180, height:200, borderRadius:5}} source={{uri:item.image_url}} />
                <View style={{flex:1,marginTop:10, marginLeft:15}}>
                  <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                  <Text style={{fontStyle:'italic', color:'tomato', fontSize:15, marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                  <View style={{ marginTop:10}}>
                    <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                    <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                    <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                    <TouchableOpacity style={{marginTop:5}} onPress={() => props.navigation.navigate('ExplorerDetails', {item})}>
                      <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)'}}>En savoir plus</Text>
                    </TouchableOpacity>
                    {/* {
                        currentUserFavorites ?
                        props.currentUserFavorites.map( (value, i) => {
                          if(value.animeId == item.mal_id){
                            return (
                              <Text key={i} style={{color:'tomato', fontSize:20}}>♥</Text>
                            )
                          }
                        })
                        :
                        null
                    } */}
                      {
                        (function() {
                          var formattedFavorites = false
                          props.currentUserFavorites.forEach( function (element) {
                            if(element.animeId == item.mal_id){
                              formattedFavorites = true
                            }
                          })
                          console.log(formattedFavorites)
                          if(formattedFavorites){
                            return (
                              <Text style={{color:'tomato', fontSize:20}}>♥</Text>
                            )
                          }
                          else {
                            return (
                              <TouchableOpacity onPress={() => props.navigation.navigate('ExplorerDetails', {item})}>
                                <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>Ajouter aux favoris</Text>
                              </TouchableOpacity>
                            )
                          }
                        })()
                      }
                  </View>
                </View>
              </View>
              <View style={{alignItems:'center'}}>
                  <View style={{flex:1, borderBottomColor: '#E7E7E7', marginVertical:5,width:'100%', borderBottomWidth:1}}/>
                </View>
            </View>
           )
          }
          />
        </SafeAreaView>
      </View>
    )
}

const mapStateToProps = (store) => ({
  currentUserFavorites: store.userState.currentUserFavorites
})

export default connect(mapStateToProps)(searchResults)