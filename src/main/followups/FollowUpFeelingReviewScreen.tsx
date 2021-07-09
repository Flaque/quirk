import React from "react";
import { Thought, newThought } from "../../thoughts";
import { ScreenProps } from "react-navigation";
import {
  Container,
  MediumHeader,
  GhostButton,
  HintHeader,
  ActionButton,
} from "../../ui";
import Constants from "expo-constants";
import theme from "../../theme";
import { StatusBar } from "react-native";
import { THOUGHT_SCREEN, FINISHED_SCREEN } from "../screens";
import { get } from "lodash";
import haptic from "../../haptic";
import { saveThought } from "../../thoughtstore";
import * as stats from "../../stats";

const POSITIVE_HEADER = "Great! We'll write that down.";
const NEUTRAL_OR_NEGATIVE_HEADER = "Here's your next steps.";

const POSITIVE_HINT =
  "Would you still like to review your thought? You can also can finish now and go about your day.";
const NEUTRAL_OR_NEGATIVE_HINT =
  "If you're dealing with something new or want to walk through the process again, record a new thought. Otherwise, you should review what you wrote before; is it accurate? ";

export default class FollowUpFeelingReviewScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
    isReady: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    thought: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
        isReady: true,
      });
    });
  }

  completeFollowUp = async () => {
    stats.userCompletedFollowUp();

    // Mark this followup as completed
    const oldThought = this.state.thought;
    oldThought.followUpCompleted = true;
    await saveThought(oldThought);
  };

  onFinish = async () => {
    haptic.selection();
    await this.completeFollowUp();
    this.props.navigation.navigate(THOUGHT_SCREEN);
  };

  onReviewThought = async () => {
    stats.userReviewedThoughtOnFollowUp();

    haptic.selection();
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought: this.state.thought,
    });
  };

  onNewThought = async () => {
    stats.userRecordedNewThoughtOnFollowUp();

    haptic.selection();
    await this.completeFollowUp();

    this.props.navigation.navigate(THOUGHT_SCREEN, {
      thought: newThought(),
      isRequestingPopUp: true,
    });
  };

  render() {
    if (!this.state.isReady) {
      return <Container />;
    }

    return (
      <Container
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <StatusBar barStyle="dark-content" hidden={false} />

        <MediumHeader>
          {this.state.thought.followUpCheckup === "better"
            ? POSITIVE_HEADER
            : NEUTRAL_OR_NEGATIVE_HEADER}
        </MediumHeader>
        <HintHeader
          style={{
            marginBottom: 12,
          }}
        >
          {this.state.thought.followUpCheckup === "better"
            ? POSITIVE_HINT
            : NEUTRAL_OR_NEGATIVE_HINT}
        </HintHeader>

        {this.state.thought.followUpCheckup === "better" && (
          <>
            <ActionButton
              title="Finish"
              style={{
                marginBottom: 12,
              }}
              width={"100%"}
              onPress={this.onFinish}
            />
            <GhostButton
              title="Review Thought"
              onPress={this.onReviewThought}
            />
          </>
        )}

        {this.state.thought.followUpCheckup !== "better" && (
          <>
            <ActionButton
              title="Finish"
              style={{
                marginBottom: 12,
              }}
              width={"100%"}
              onPress={this.onNewThought}
            />
            <GhostButton
              title="Review Thought"
              onPress={this.onReviewThought}
            />
          </>
        )}
      </Container>
    );
  }
}
