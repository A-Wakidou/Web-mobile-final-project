import React, {useEffect, useState, useRef} from "react"
import { View,SafeAreaView,Animated, Text,StatusBar,Pressable, TouchableOpacity, StyleSheet,FlatList, ActivityIndicator, Image, useWindowDimensions, ScrollView } from "react-native"

const Home = ({navigation}) => {

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [dataByPopularity, setDataByPopularity] = useState([])
  const {width} = useWindowDimensions()
  const scrollX = useRef(new Animated.Value(0)).current
  const getMangas = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/top/anime/1/upcoming');
      const json = await response.json()
      setData(json.top);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getMangasByPopularity = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&limit=5');
      const json = await response.json()
      setDataByPopularity(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMangas()
    getMangasByPopularity()
  }, []);

  return (
    <SafeAreaView style={{flex:1,paddingTop: StatusBar.currentHeight}}>
      <ScrollView>
        <View style={{ flex:1, backgroundColor:'#fff', justifyContent:'center'}}>
          <View>
          <View style={{paddingVertical:8, position:'absolute', top:0,left:0,right:0,bottom:'100%', backgroundColor:'#21252b',borderTopLeftRadius:4, borderTopRightRadius:4}}>
            <Text style={{ width:'95%', padding:5, marginLeft:8, fontWeight:'bold',color:'white', fontSize:20, borderWidth:1, borderColor:'white'}}>À la une</Text>
          </View>
            <SafeAreaView>
              <FlatList
                data={dataByPopularity}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.title}
                onScroll= {Animated.event([{nativeEvent: {contentOffset : { x :scrollX} }}], {
                  useNativeDriver:false
                })}
                renderItem={({ item }) => (
                  <Pressable style={[styles.carouselContainer, {width}]} onPress={() => navigation.navigate('Details', {item})}>
                    <Image style={{width, height:550}} source={{uri:item.image_url}} />
                    <View style={styles.carouselText}>
                      <Text style={{ fontSize:20,textAlign:'center', fontWeight:'bold'}}>{item.title}</Text>
                      <Text style={{ fontSize:10,textAlign:'center', fontWeight:'bold', marginVertical:5}}>Score: {item.score}/10</Text>
                    </View>
                  </Pressable>
                )}
              />
              <Text style={{fontSize:10,fontStyle:'italic', color:'tomato', textAlign:'center', marginVertical:15}}>Tendances</Text>
              <View style={{flexDirection:'row', justifyContent:'center', height:30}}>
                  {dataByPopularity.map((_, i) => {
                    const inputRange = [(i-1) * width, i * width, (i+1) * width]
                    const dotWidth = scrollX.interpolate({
                      inputRange,
                      outputRange: [10,20,10],
                      extrapolate: 'clamp'
                    })
                    const opacity = scrollX.interpolate({
                      inputRange,
                      outputRange:[0.3, 1, 0.3],
                      extrapolate:'clamp'
                    })
                    return <Animated.View style={{height: 10, borderRadius:5, backgroundColor: 'tomato', width:dotWidth,opacity:opacity, marginHorizontal:2}} key={i.toString()} />
                  })}
              </View>
            </SafeAreaView>
          </View>

          <View style={{padding:10}}>

            <View style={{paddingVertical:8, backgroundColor:'#21252b',borderRadius:4, marginBottom:30}}>
              <Text style={{ width:'95%', padding:5, marginLeft:8, fontWeight:'bold',color:'white', fontSize:20, borderWidth:1, borderColor:'white'}}>Top prochaines sorties</Text>
            </View>

            {isLoading ? <ActivityIndicator/> : (
            <SafeAreaView style={{flex:1}}>
              <FlatList
                numColumns="2"
                data={data}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                  <View style={{flex: 1}}>
                    <TouchableOpacity style={{alignItems:'center',}} onPress={() => navigation.navigate('Details', {item})}>
                      <Image style={{ width:'70%', height:200}} source={{uri:item.image_url}} />
                      <Text style={{fontStyle:'italic', fontSize:12,textAlign:'center', fontWeight:'bold',paddingVertical:5}}>{item.title}</Text>
                      <Text style={{fontSize:10,fontStyle:'italic', color:'tomato'}}>{item.start_date ? item.start_date : 'Date dévoilée prochainement'}</Text>
                      <View style={{flex:1, borderBottomColor: '#E7E7E7', marginTop:10, marginBottom:20, borderBottomWidth:1, width:'80%'}}/>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </SafeAreaView>
            )}
            </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}
export default Home

const styles = StyleSheet.create({
    carouselContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    carouselText: {
      height: 50,
      paddingVertical: 10,
    },
    carouselDescription: {
      fontWeight: '300',
      textAlign: 'center',
      paddingHorizontal: 64
    }
})