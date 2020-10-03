import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  render(){
  return (
    <View>
      <Text
       style={{fontSize: 50, textAlign: 'center',fontFamily:'Roboto'}}
      >Hello, Welcome to Quirk</Text>
      <TouchableOpacity
      style={{backgroundColor: '#2ce8c8', width: 200, height: 35,
       alignSelf: 'center', alignContent: 'center' }}
      >

      <Text
      style={{fontSize: 30, textAlign: 'center',fontFamily:'Roboto'}}
      >Read More about Quirk</Text>
      </TouchableOpacity>
    </View>
  );
  }

}

const styles = StyleSheet.create({
 
});
