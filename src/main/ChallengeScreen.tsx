import React from "react";
import ScreenProps from "../ScreenProps";
import { Text } from "react-native";

export default class ChallengeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", params => {
      console.log(params);
    });
  }

  render() {
    return <Text>challenge</Text>;
  }
}
