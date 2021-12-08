import React from 'react'
import { ScrollView,View,Text, Image,StyleSheet, Button, Linking} from 'react-native'

export default function Detail({route}) {
    const {item} = route.params
    console.log(item)
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <Image style={{width:'100%',height:600}} source={{uri:item.image_url}} />
                <View style={{borderBottomLeftRadius:10, borderBottomRightRadius:10, backgroundColor:'#21252b',}}>
                    <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', color:'white', paddingTop:15, paddingBottom:15}}>{item.title}</Text>
                </View>
                <View style={{flex:1, marginLeft:15, marginTop:20, paddingBottom:10}}>
                    <Text style={styles.viewText}><Text style={styles.span}>Fans : </Text>{item.members}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Classment (Top sorties) : </Text>{item.rank}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Date de sortie : </Text>{item.start_date ? item.start_date : 'Dévoilée prochainement'}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Nombre total d'épisodes prévus : </Text>{item.episodes}</Text>
                    <Text style={styles.viewText}><Text style={styles.span}>Type de sortie : </Text>{item.type}</Text>
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
