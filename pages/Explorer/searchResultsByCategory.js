import React from 'react'
import { SafeAreaView, View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { getFirestore, collection, addDoc } from "firebase/firestore"
import {addToFavorites} from '../../redux/actions/addFavorites'
import { bindActionCreators} from 'redux'

function searchResultsByCategory(props) {

  const data = props.route.params.data
  const categoryId = props.route.params.category
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

  function add(item) {
    const db = getFirestore();
    addDoc(collection(db, "favorites"), {
        uid:props.currentUser.uid,
        mal_id:item.mal_id,
        title: item.title,
        image_url:item.image_url
    })
    props.addToFavorites(item)
  }

  function isFavorite(item) {
    var favorites = props.currentUserFavorites.filter(favorites => favorites.mal_id == item.mal_id)
    if(favorites.length != 0){
      return(
      <Text style={{color:'tomato', fontSize:20}}>♥</Text>
      )
    }
    else {
      return(
        <TouchableOpacity onPress={() => add(item)}>
          <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>Ajouter aux favoris</Text>
        </TouchableOpacity>
      )
    }
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
                <View style={{flexDirection:'row'}}>
                  <Image style={{ width:180, height:300, borderRadius:5}} source={{uri:item.image_url}} />
                  <View style={{flex:1,marginTop:10, marginLeft:15}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{fontStyle:'italic', color:'tomato', fontSize:15, marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                    <View style={{flex:1, marginTop:10}}>
                      <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                      <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                      <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                      <TouchableOpacity onPress={() => props.navigation.navigate('ExplorerDetails', {item})}>
                        <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>En savoir plus</Text>
                      </TouchableOpacity>
                      {
                        isFavorite(item)
                      }
                    </View>
                  </View>
                </View>
                <View style={{alignItems:'center'}}>
                  <View style={{flex:1, borderBottomColor: '#E7E7E7', marginVertical:5,width:'100%', borderBottomWidth:1}}/>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUserFavorites: store.userState.currentUserFavorites,
  currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({addToFavorites}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(searchResultsByCategory)