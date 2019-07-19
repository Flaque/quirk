import React from "react";
import ScreenProps from "../ScreenProps";
import { Text } from "react-native";

export default class AlternativeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <Text>challenge</Text>;
  }
}
