import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  SubHeader,
  RoundedSelectorButton,
  ActionButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { TextInput } from "../../textInputStyle";
import { PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN } from "../screens";

export default class AssumptionNoteScreen extends React.Component<
  ScreenProps,
  {
    event: string;
    felt: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    event: "",
    felt: "",
  };

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
  };

  onFelt = async (felt: string) => {
    this.setState({
      felt,
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          paddingHorizontal: 24,
        }}
      >
        <StatusBar hidden={false} />
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 48,
          }}
        >
          <MediumHeader>Predicted Experience</MediumHeader>
          <HintHeader>How do you think this will go?</HintHeader>

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Expected Experience
          </SubHeader>
          <RoundedSelectorButton
            title="Going to go well 👍"
            onPress={() => this.onFelt("good")}
            selected={this.state.felt === "good"}
          />
          <RoundedSelectorButton
            title="Going to go okay 🤷‍"
            onPress={() => this.onFelt("neutral")}
            selected={this.state.felt === "neutral"}
          />
          <RoundedSelectorButton
            title="Going to go poorly 👎"
            onPress={() => this.onFelt("bad")}
            selected={this.state.felt === "bad"}
          />

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Thought
          </SubHeader>
          <HintHeader>
            In your own words, describe what you think might happen.
          </HintHeader>
          <TextInput
            onChangeText={event => {
              this.setState({
                event,
              });
            }}
            value={this.state.event}
            placeholder="ex: giving a presentation in front of..."
            multiline={true}
            numberOfLines={6}
          />

          <ActionButton
            style={{
              marginTop: 12,
              marginBottom: 24,
            }}
            title="Continue"
            onPress={() => {
              this.props.navigation.navigate(
                PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN
              );
            }}
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
