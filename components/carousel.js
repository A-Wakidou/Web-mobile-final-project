import React, { Component, useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View,ScrollView, Image, Dimensions, PanResponder, Animated} from 'react-native'
export default function Carousel() {

    var widthDevice = Dimensions.get('window').width
    const[movies,setMovies] = useState([
    'http://placekitten.com/200/300',
    'http://placekitten.com/200/300',
    'http://placekitten.com/200/300'])
    const[width, setWidth] = useState(widthDevice)
    const [translate, setTranslate]= useState(new Animated.Value(0))
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder:(evt,gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt,gestureState) => false,
            onMoveShouldSetPanResponder: (evt,gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt,gestureState) => true,
            onPanResponderTerminationRequest: () => false,
            onPanResponderMove: (evt,gestureState) => {
                console.log('Je bouge')
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log('Je lache')
                Animated.timing(
                    translate,
                    {
                        duration: 300,
                        toValue: width * -1,
                        useNativeDriver: false
                    }
                ).start()
            },
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('Terminate')
            },
            onShouldBlockNativeResponder: (evt,gestureState) => true
        })
    ).current

    function getStyle() {
        return {
            slider: {
                flexDirection: 'row',
                height: 200,
                width: movies.length * width,
                left: translate
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
                {movies.map( (movie, k) =>{
                    return (
                        <View>
                            <Image key={k} source={{uri:movie}}  style={style.image}/>
                        </View>
                    )
                })}
            </Animated.View>
        )
}