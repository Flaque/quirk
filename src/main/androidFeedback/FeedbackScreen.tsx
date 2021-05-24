import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  Row,
  Container,
  GhostButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { Thought } from "../../thoughts";
import { StatusBar, ScrollView } from "react-native";
import { THOUGHT_SCREEN, FEEDBACK_LEAVE_REVIEW } from "../screens";
import { Linking } from "expo";
import * as stats from "../../stats";
import * as flagstore from "../../flagstore";
import { StackActions } from "react-navigation";
import { NavigationActions } from "react-navigation";

export default class FeedbackScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    flagstore.setTrue("has-rated");
  }

  // Fixes weird back-bug
  resetToThoughtScreen = () => {
    const reset = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: THOUGHT_SCREEN })],
    });
    this.props.navigation.dispatch(reset);
  };

  continue = () => {
    stats.userDismissedFeedback();
    this.resetToThoughtScreen();
  };

  onEmailFeedback = () => {
    stats.userGaveFeedback();
    Linking.openURL(
      "mailto:humans@quirk.fyi?subject=" +
        encodeURI("[Feedback]") +
        "&body=" +
        encodeURI("I wish Quirk would...")
    );

    this.resetToThoughtScreen();
  };

  onLeaveReview = () => {
    this.props.navigation.push(FEEDBACK_LEAVE_REVIEW);
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
        <StatusBar barStyle="dark-content" hidden={false} />
        <ScrollView
          style={{
            paddingBottom: 24,
          }}
        >
          <>
            <MediumHeader
              style={{
                marginBottom: 12,
                marginLeft: 0,
              }}
            >
              Just curious, anything Quirk could do better?
            </MediumHeader>
            <HintHeader
              style={{
                marginBottom: 24,
              }}
            >
              Quirk is run by two brothers with deep personal experiences with
              mental health. But we don't know all the answers. We let you
              decide what we build, so if there's anything you'd like to change
              or a feature you'd like to see, please let us know!
            </HintHeader>

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                title={"🤔 I wish Quirk would..."}
                onPress={() => this.onEmailFeedback()}
                width={"100%"}
              />
            </Row>

            <Row
              style={{
                marginTop: 12,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                title={"❤️ I like Quirk!"}
                onPress={() => this.onLeaveReview()}
                width={"100%"}
              />
            </Row>

            <Row
              style={{
                marginTop: 12,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                title={"Continue without giving feedback"}
                onPress={() => this.continue()}
                width={"100%"}
              />
            </Row>
          </>
        </ScrollView>
      </Container>
    );
  }
}
