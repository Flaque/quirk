import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  RoundedSelectorButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { THOUGHT_SCREEN } from "../screens";

type FollowUpSelections = "+3 hours" | "+1 day" | "+5 days" | string;

export default class PredictionScheduleFollowUpScreen extends React.Component<
  ScreenProps,
  {
    followUpOn: FollowUpSelections;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    followUpOn: "+5 day",
  };

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.navigate(THOUGHT_SCREEN);
  };

  onSelect = async (followUpOn: FollowUpSelections) => {
    this.setState({
      followUpOn,
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
            paddingBottom: 24,
          }}
        >
          <MediumHeader>Schedule Follow Up</MediumHeader>
          <HintHeader>
            We'll follow up in the future to see if your prediction came true.
          </HintHeader>

          <RoundedSelectorButton
            title="+3 hours from now"
            onPress={() => this.onSelect("+3 hours")}
            selected={this.state.followUpOn === "+3 hours"}
          />
          <RoundedSelectorButton
            title="Tomorrow"
            onPress={() => this.onSelect("+1 day")}
            selected={this.state.followUpOn === "+1 day"}
          />
          <RoundedSelectorButton
            title="+5 days from now"
            onPress={() => this.onSelect("+5 days")}
            selected={this.state.followUpOn === "+5 days"}
          />

          <ActionButton
            style={{
              marginTop: 12,
            }}
            title="Continue"
            onPress={this.onFinish}
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
