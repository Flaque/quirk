import React, { Component } from 'react'
import { Text,View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  return (
    <View style = {{backgroundColor: 'rgb(255,228,181)'}}>
    <View style={{ 
          width: SCREEN_WIDTH,
          height: 0,
          borderTopColor: "orange",
          borderTopWidth: SCREEN_HEIGHT/7,
          borderRightWidth: SCREEN_WIDTH/1,
          borderRightColor: 'transparent'
          }}>

    </View>
    <View style = {styles.SplashView}>
        <Text style = {styles.SplashText}>CBT</Text>
        <Text style = {styles.SplashSubtitleText}>Cognitive Behavioral Therapy</Text>
    </View>   

    <View style = {styles.SplashTextView}>
      <p>Cognitive Behavioral Therapy or CBT is a practice used by psychologists to help people improve their mental health. CBT is known to have helped treat people with anxiety and depression - two very common mental health problems which are ailing a large portion of our society today.</p>
    </View>
             
    </View>
  );
}

const styles = StyleSheet.create({
  SplashView:{
    backgroundColor: "#309BE3",
    height: 150,
    justifyContent: "center"
  },
  SplashTextView:{
    backgroundColor: "#309BE3",
    height: 150,
    justifyContent: "center"
  },
  SplashText:{
    fontFamily: "Arial, sans-serif",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center"
  },
  SplashSubtitleText:{
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    fontSize: 20,
    fontWeight: "bold",
    color: "yellow",
    alignSelf: "center"
  },
  SplashButton:{
    alignSelf:"center",
    backgroundColor: "#309BE3",
    height: 60,
    width: 250,
    justifyContent: "center",
    borderRadius: 80,
    marginBottom:120
  }
})
