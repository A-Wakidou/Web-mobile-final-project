import React from 'react'
import { ScrollView,View,Text, Image,StyleSheet, Button, Linking} from 'react-native'

export default function ExplorerDetails({route, navigation}) {
    const {item} = route.params
    console.log(item)
    return (
        <ScrollView>
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <Image style={{width:'100%',height:600}} source={{uri:item.image_url}} />
                <View style={{borderBottomLeftRadius:4, borderBottomRightRadius:4, backgroundColor:'black',}}>
                    <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', color:'white', paddingTop:15, paddingBottom:15}}>{item.title}</Text>
                </View>
                <View style={{flex:1, marginLeft:15, marginTop:20, paddingBottom:10}}>
                    <Text style={styles.viewText}><Text style={styles.span}>Fans : </Text>{item.members}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Score : </Text>{item.score}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Date de lancement : </Text>{item.start_date ? item.start_date.substring(0,10) : 'Dévoilée prochainement'}</Text>
                    { item.end_date!=null ?
                        <Text style={styles.viewText}><Text style={styles.span}>Date de fin : </Text>{item.end_date.substring(0,10)}</Text>
                        :
                        null
                    }
                    <Text style={styles.viewText}><Text style={styles.span}>Type : </Text>{item.type}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Synopsis (EN) : </Text>{item.synopsis}</Text>
                    <Button onPress={() => Linking.openURL(item.url)} title="Plus d'informations" />
                </View>
            </View>
        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewText: {
        marginBottom: 10
    },
    span: {
        fontWeight:'bold',
        color:'tomato'
    }
})
