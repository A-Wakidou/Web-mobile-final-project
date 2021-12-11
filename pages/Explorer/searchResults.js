import React, { useState, useEffect } from 'react'
import { SafeAreaView,View,Text, Image,FlatList, TouchableOpacity} from 'react-native'
import { getFirestore,getDocs, collection, addDoc } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

export default function searchResults({route, navigation}) {
    const {data} = route.params
    const text = route.params.text
    const [isadded, setIsAdded] = useState()
    const [addedAnimes, setAddedAnimes] = useState([])
    const db = getFirestore();
    const auth = getAuth();
    async function getFavorites() {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      querySnapshot.forEach((doc) => {
        setAddedAnimes(oldArray => [...oldArray, doc.data().animeId])
      })
    }


    function favorite(mal_id) {
      addedAnimes.map( (id) => {
        if(id==mal_id)
        {
          return(                           
            <View style={{paddingVertical:8, backgroundColor:'#21252b',borderRadius:4, marginVertical:10}}>
              <Text style={{ width:'60%', padding:5, marginLeft:8, fontWeight:'bold',color:'tomato', fontSize:20, borderWidth:1, borderColor:'white'}}>[Favoris]</Text>
            </View>)
        } 
      })
      // return(
      //   <TouchableOpacity onPress={() => {
      //     addDoc(collection(db, "favorites"), {
      //         animeId:item.mal_id,
      //         animeName:item.title,
      //         userId: auth.currentUser.uid
      //     })
      //   }}>
      //     <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>Ajouter aux favoris</Text>
      //   </TouchableOpacity>
      // )
    }


    useEffect(() => {
      getFavorites()
    }, []);


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
            <View>
              <View style={{flex: 1, flexDirection:'row'}}>
                <Image style={{ width:180, height:200, borderRadius:5}} source={{uri:item.image_url}} />
                <View style={{flex:1,marginTop:10, marginLeft:15}}>
                  <Text style={{fontSize:20, fontWeight:'bold'}}>{item.title}</Text>
                  <Text style={{fontStyle:'italic', color:'tomato', fontSize:'15', marginTop:2}}>{ item.publishing ? 'En cours' : 'Terminé' }</Text>
                  <View style={{flex:1, marginTop:10}}>
                    <Text><Text style={{fontWeight:'bold'}}>Type : </Text>{item.type} </Text>
                    <Text><Text style={{fontWeight:'bold'}}>Fans : </Text>{item.members} </Text>
                    <Text><Text style={{fontWeight:'bold'}}>Score : </Text>{ item.score }</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ExplorerDetails', {item})}>
                      <Text style={{fontWeight:'bold', color:'rgb(33, 150, 243)', marginTop:5}}>En savoir plus</Text>
                    </TouchableOpacity>
                    { favorite(item.mal_id) }

                  </View>
                </View>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
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
