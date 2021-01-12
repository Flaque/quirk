import * as React from 'react';
import {Copmponent} from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default class AppHeader extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.displayText}>CBT Quirk App</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"blue",
        margin:10,
        borderWidth:2,
        borderColor:"black",
        borderRadius:40
    },
    displayText:{
        color:"cyan",
        fontSize:30,
        fontFamily:'fantasy',
        fontWeight:"bold"
    }
})