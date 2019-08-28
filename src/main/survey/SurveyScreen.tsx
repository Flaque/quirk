/**
 * This is roughly based off Superhuman's PMF survey.
 */

import React from "react";
import {
  MediumHeader,
  HintHeader,
  RoundedSelectorButton,
  SubHeader,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, ScrollView, StatusBar } from "react-native";
import theme from "../../theme";
import haptic from "../../haptic";
import * as Haptic from "expo-haptics";
import { THOUGHT_SCREEN } from "../screens";
import { addTagsToUser } from "../../id";
import { userRecordedDisappointedSurvey } from "../../stats";
import { resetNavigationTo } from "../../resetNavigationTo";

export default class SurveyScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  onChange = async (answer: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Record over time
    userRecordedDisappointedSurvey(answer);
    await addTagsToUser({
      disappointedAnswer: answer,
    });

    resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
  };

  // From editing
  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
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
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
          }}
        >
          <StatusBar hidden={false} />
          <MediumHeader
            style={{
              marginBottom: 24,
            }}
          >
            One last thing...
          </MediumHeader>

          <SubHeader>
            How would you feel if you could no longer use Quirk?
          </SubHeader>
          <HintHeader>
            This is just for feedback purposes; Quirk isn't going anywhere.
          </HintHeader>

          <RoundedSelectorButton
            title="Very Disappointed"
            onPress={() => this.onChange("very")}
          />
          <RoundedSelectorButton
            title="Somewhat Disappointed"
            onPress={() => this.onChange("somewhat")}
          />
          <RoundedSelectorButton
            title="Not Disappointed"
            onPress={() => this.onChange("not")}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
