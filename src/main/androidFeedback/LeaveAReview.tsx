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
import { THOUGHT_SCREEN } from "../screens";
import { Linking } from "expo";
import * as stats from "../../stats";
import { StackActions, NavigationActions } from "react-navigation";

export default class LeaveReview extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  // Fixes weird back-bug
  resetToThoughtScreen = () => {
    const reset = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: THOUGHT_SCREEN })],
    });
    this.props.navigation.dispatch(reset);
  };

  continue = () => {
    this.resetToThoughtScreen();
  };

  onLeaveReview = () => {
    stats.userReviewed();
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=tech.econn.quirk"
    );
    this.continue();
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
              Would you mind leaving Quirk a review?
            </MediumHeader>
            <HintHeader
              style={{
                marginBottom: 24,
              }}
            >
              It's not something that we like bugging you with, but the
              structure of the Play Store forces us to. By reviewing Quirk, you
              help a lot more people find accessible help to their problems.
            </HintHeader>

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                title={"Sure! 👍"}
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
                title={"No Thanks."}
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
