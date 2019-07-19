import React from "react";
import ScreenProps from "../ScreenProps";
import { Text } from "react-native";
import { Container, MediumHeader, HintHeader } from "../ui";
import Constants from "expo-constants";

export default class ChallengeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", params => {
      console.log("params");
    });
  }

  render() {
    return (
      <Container
        style={{
          marginTop: Constants.statusBarHeight,
        }}
      >
        <MediumHeader>Challenge your thought</MediumHeader>
        <HintHeader>
          In your own words, write out what about your thought is distorted.
        </HintHeader>
      </Container>
    );
  }
}
