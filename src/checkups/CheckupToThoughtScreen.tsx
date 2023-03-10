import React from "react";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import theme from "../theme";
import { ActionButton, MediumHeader, HintHeader, GhostButton } from "../ui";
import { ScrollView, StatusBar } from "react-native";
import { THOUGHT_SCREEN, AUTOMATIC_THOUGHT_SCREEN } from "../main/screens";

export default class CheckupToThoughtScreen extends React.Component<
  ScreenProps
> {
  static navigationOptions = {
    header: null,
  };

  onChallenge = () => {
    this.props.navigation.navigate(AUTOMATIC_THOUGHT_SCREEN);
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          paddingHorizontal: 24,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <StatusBar hidden={false} />

        <MediumHeader>Let's work through it right now.</MediumHeader>
        <HintHeader>
          It's likely your thoughts are distorted. Practicing challenging your
          negative thoughts can help you feel a lot better.
        </HintHeader>

        <ActionButton
          style={{
            marginTop: 12,
          }}
          width="100%"
          title="Okay, let's challenge it."
          onPress={this.onChallenge}
        />

        <GhostButton
          style={{
            marginTop: 6,
          }}
          width="100%"
          title="No thanks."
          onPress={() => {
            this.props.navigation.navigate(THOUGHT_SCREEN);
          }}
        />
      </ScrollView>
    );
  }
}
