import React from "react";
import theme from "../theme";
import { Container, MediumHeader, HintHeader, ActionButton, Row } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { CHECKUP_SUMMARY_SCREEN } from "./screens";

export default class PredictTheFutureScreen extends React.Component<
  ScreenProps
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    goal: "",
  };

  onChange = async txt => {
    this.setState({
      goal: txt,
    });
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.push(CHECKUP_SUMMARY_SCREEN);
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            style={{
              paddingBottom: 24,
            }}
          >
            <MediumHeader>
              How do you think you'll be the next time you check-in?
            </MediumHeader>
            <HintHeader
              style={{
                marginBottom: 24,
              }}
            >
              We'll get you started in a moment, but first we have some
              questions.
            </HintHeader>

            <Row
              style={{
                marginTop: 24,
              }}
            >
              <ActionButton
                title={"Next"}
                width="100%"
                onPress={() => this.onNext()}
              />
            </Row>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
