import * as React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

export default class App extends React.Component {
    render() {
        return ( <
            View style = {
                styles.container
            } >
            <
            TouchableOpacity >
            <
            Text > Test Button < /Text>

            <
            /TouchableOpacity> <
            /View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightsalmon",
        color: "white",
    }
})