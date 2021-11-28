import React, {useEffect, useState} from "react"
import { View,Text } from "react-native"
import axios from "axios"

const Home = ({navigation}) => {
  const [data,setData] = useState([])
  const callAPI = () => {
    axios.get('https://kitsu.io/api/edge/anime?filter[categories]=adventure')
      .then(response => {
        setData(response)
      })
      console.log(data)
  }
  callAPI()
  return (
    <View>
      <Text>{data}</Text>
    </View>
  )
}

export default Home