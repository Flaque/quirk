import React from "react";
import {
  MediumHeader,
  HintHeader,
  GhostButtonWithGuts,
  Paragraph,
  SubHeader,
  Row,
  ActionButton,
  GhostButton,
  Badge,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { SavedThought } from "../thoughts";
import { View, Alert, Platform } from "react-native";
import theme from "../theme";
import {
  THOUGHT_SCREEN,
  CHALLENGE_SCREEN,
  ALTERNATIVE_SCREEN,
  DISTORTION_SCREEN,
  FOLLOW_UP_NOTE_SCREEN,
  FEEDBACK_SCREEN,
  SURVEY_SCREEN,
} from "./screens";
import { ScrollView } from "react-navigation";
import { deleteThought, saveThought, countThoughts } from "../thoughtstore";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import dayjs from "dayjs";
import EmojiList from "./EmojiList";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import followUpState from "./followups/followUpState";
import * as flagstore from "../flagstore";
import { resetNavigationTo } from "../resetNavigationTo";
import { getUserID } from "../id";
import { passesFeatureFlag } from "../featureflags";

export default class FinishedScreen extends React.Component<
  ScreenProps,
  {
    thought?: SavedThought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
      });
    });
  }

  shouldSendToAndroidReview = async (): Promise<boolean> => {
    if (Platform.OS !== "android") {
      return false;
    }

    if (await flagstore.get("has-rated", "false")) {
      return false;
    }

    if ((await countThoughts()) < 2) {
      return false;
    }

    if (
      this.state.thought &&
      this.state.thought.immediateCheckup !== "better"
    ) {
      return false;
    }

    return true;
  };

  shouldSendToSurvey = async (): Promise<boolean> => {
    const passes = await passesFeatureFlag("disappointed-survey", 4);
    if (!passes) {
      return false;
    }

    if (await flagstore.get("has-been-surveyed", "false")) {
      return false;
    }

    await flagstore.setTrue("has-been-surveyed");
    return true;
  };

  onNext = async () => {
    if (followUpState(this.state.thought) === "ready") {
      const oldThought = this.state.thought;
      oldThought.followUpCompleted = true;
      await saveThought(oldThought);
    }

    if (await this.shouldSendToAndroidReview()) {
      this.props.navigation.push(FEEDBACK_SCREEN);
      return;
    }

    if (await this.shouldSendToSurvey()) {
      this.props.navigation.push(SURVEY_SCREEN);
      return;
    }

    resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
    haptic.notification(Haptic.NotificationFeedbackType.Success);
  };

  onDelete = async () => {
    const uuid = this.state.thought.uuid;
    await deleteThought(uuid);
    this.onNext();
    haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
  };

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: theme.lightOffwhite,
          paddingTop: Constants.statusBarHeight + 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 50,
        }}
      >
        {this.state.thought && (
          <View
            style={{
              paddingBottom: 50 + TAB_BAR_HEIGHT,
            }}
          >
            <View
              style={{
                marginBottom: 18,
              }}
            >
              {followUpState(this.state.thought) === "scheduled" && (
                <Badge
                  text="Follow up scheduled"
                  featherIconName="clipboard"
                  style={{
                    marginBottom: 18,
                  }}
                />
              )}
              {followUpState(this.state.thought) === "ready" && (
                <Badge
                  text="Reviewing Thought"
                  featherIconName="clipboard"
                  backgroundColor={theme.lightPink}
                  style={{
                    marginBottom: 18,
                  }}
                />
              )}
              <MediumHeader>
                {followUpState(this.state.thought) === "ready"
                  ? "Does this still seem correct?"
                  : "Summary of Thought"}
              </MediumHeader>
              <HintHeader>
                {followUpState(this.state.thought) === "ready" &&
                  "Thought recorded on"}{" "}
                {dayjs(this.state.thought.createdAt.toString()).format(
                  "D MMM YYYY, h:mm a"
                )}
              </HintHeader>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>Your first thought</SubHeader>
              <GhostButtonWithGuts
                borderColor={theme.lightGray}
                onPress={() => {
                  this.props.navigation.navigate(THOUGHT_SCREEN, {
                    thought: this.state.thought,
                    isEditing: true,
                  });
                }}
              >
                <Paragraph>{this.state.thought.automaticThought}</Paragraph>
              </GhostButtonWithGuts>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>How you challenged it</SubHeader>
              <GhostButtonWithGuts
                borderColor={theme.lightGray}
                onPress={() => {
                  this.props.navigation.push(DISTORTION_SCREEN, {
                    thought: this.state.thought,
                    isEditing: true,
                  });
                }}
                style={{
                  marginBottom: 6,
                }}
              >
                <EmojiList thought={this.state.thought} />
              </GhostButtonWithGuts>

              <GhostButtonWithGuts
                borderColor={theme.lightGray}
                onPress={() => {
                  this.props.navigation.push(CHALLENGE_SCREEN, {
                    thought: this.state.thought,
                    isEditing: true,
                  });
                }}
              >
                <Paragraph>{this.state.thought.challenge}</Paragraph>
              </GhostButtonWithGuts>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>What you could think</SubHeader>
              <GhostButtonWithGuts
                borderColor={theme.lightGray}
                onPress={() => {
                  this.props.navigation.push(ALTERNATIVE_SCREEN, {
                    thought: this.state.thought,
                    isEditing: true,
                  });
                }}
              >
                <Paragraph>{this.state.thought.alternativeThought}</Paragraph>
              </GhostButtonWithGuts>
            </View>

            {this.state.thought.followUpNote && (
              <View
                style={{
                  marginBottom: 12,
                }}
              >
                <SubHeader>Follow-up Note</SubHeader>
                <GhostButtonWithGuts
                  borderColor={theme.lightGray}
                  onPress={() => {
                    this.props.navigation.push(FOLLOW_UP_NOTE_SCREEN, {
                      thought: this.state.thought,
                      isEditing: true,
                    });
                  }}
                >
                  <Paragraph>{this.state.thought.followUpNote}</Paragraph>
                </GhostButtonWithGuts>
              </View>
            )}

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                title="Delete"
                borderColor={theme.red}
                textColor={theme.red}
                style={{
                  marginRight: 24,
                }}
                onPress={() => {
                  Alert.alert("Delete your thought?", "This can't be undone.", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: this.onDelete,
                      style: "destructive",
                    },
                  ]);
                }}
              />
              <ActionButton
                title={"Finish"}
                onPress={() => this.onNext()}
                style={{
                  flex: 1,
                }}
              />
            </Row>
          </View>
        )}
      </ScrollView>
    );
  }
}
