import React, { Component, useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Image, Dimensions, PanResponder, Animated} from 'react-native'
export default function Carousel() {


    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getMangas = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&limit=4');
        const json = await response.json()
        console.log(json.results)
        setData(json.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getMangas()

    }, [])

    

    var widthDevice = Dimensions.get('window').width
    const[movies,setMovies] = useState([
    'http://placekitten.com/200/300',
    'http://placekitten.com/201/300',
    'http://placekitten.com/202/300'])
    const[width, setWidth] = useState(widthDevice)
    const[page, setPage] = useState(0)
    const [translate, setTranslate]= useState(new Animated.Value(0))
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder:(evt,gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt,gestureState) => false,
            onMoveShouldSetPanResponder: (evt,gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt,gestureState) => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: Animated.event([null, {dx:translate}], {useNativeDriver:false}),
            onPanResponderRelease: endGesture,
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('Terminate')
            },
            onShouldBlockNativeResponder: (evt,gestureState) => true
        })
    ).current

    function endGesture(evt,gestureState) {
        let toValue = 0
        if(Math.abs(gestureState.dx) / width > 0.2) {
            if(gestureState.dx < 0) {
                toValue = width * -1
            }
            else {
                toValue = width
            }
        }
        Animated.timing(
            translate,
            {
                toValue: toValue,
                duration: 300,
                useNativeDriver: true
            }
        ).start( () => {
            translate.setValue(0)
            if(toValue < 0) {
                nextPage()
            }
            else if (toValue > 0) {
                prevPage()
            }
        })
    }

    function nextPage() {
        let pages = page +1
        if(pages >= data.length) {
            pages = 0
        }
        console.log(pages)
        setPage(pages)
    }

    function prevPage() {
        let pages = page -1
        if (pages < 0) {
            pages = data.length -1
        }
        setPage(pages)
    }

    function getStyle() {
        return {
            slider: {
                flexDirection: 'row',
                height: 200,
                width: data.length +2 * width,
                left: (page +1) * -1 * width,
                transform: [{
                    translateX: translate
                }] 
            },
            image: {
                width: width,
                height: 200
            }
        }
    }
    const style = getStyle()
    return (
        <Animated.View {...panResponder.panHandlers} style={style.slider}>
            <Image style={style.image}/>
            {data.map( (data, k) =>{
                return (
                    <View>
                        <Image key={k} source={{uri:data.image_url}}  style={style.image}/>
                    </View>
                )
            })}
            <Image style={style.image}/>
        </Animated.View>
    )
}