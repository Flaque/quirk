import React from "react";
import theme from "../theme";
import { Container, MediumHeader, HintHeader, ActionButton, Row } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { GOAL_SCREEN, NOTIFICATION_SCREEN } from "./screens";
import { passesFeatureFlag } from "../featureflags";

export default class WelcomeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Test out new onboarding
    const passes = await passesFeatureFlag("speedy-onboarding", 3);
    if (passes) {
      this.props.navigation.navigate(NOTIFICATION_SCREEN);
      return;
    }

    this.props.navigation.push(GOAL_SCREEN);
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MediumHeader>Welcome to Quirk! 👋</MediumHeader>
          <HintHeader
            style={{
              marginBottom: 24,
            }}
          >
            We'll get you started in a moment, but first we've got somethings to
            get out of the way.
          </HintHeader>

          <Row
            style={{
              marginTop: 12,
            }}
          >
            <ActionButton
              title={"Next"}
              width="100%"
              onPress={() => this.onNext()}
            />
          </Row>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
