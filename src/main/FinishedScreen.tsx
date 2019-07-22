import React from "react";
import {
  MediumHeader,
  HintHeader,
  Container,
  GhostButtonWithGuts,
  Paragraph,
  SubHeader,
  Row,
  ActionButton,
  GhostButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { SavedThought } from "../thoughts";
import { View, Alert } from "react-native";
import theme from "../theme";
import {
  THOUGHT_SCREEN,
  CHALLENGE_SCREEN,
  ALTERNATIVE_SCREEN,
  DISTORTION_SCREEN,
} from "./screens";
import { NavigationActions } from "react-navigation";
import { StackActions } from "react-navigation";
import { deleteExercise } from "../thoughtstore";
import haptic from "../haptic";
import { Haptic } from "expo";
import dayjs from "dayjs";
import EmojiList from "./EmojiList";

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

  onNext = () => {
    const reset = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: THOUGHT_SCREEN })],
    });
    this.props.navigation.dispatch(reset);
    haptic.notification(Haptic.NotificationFeedbackType.Success);
  };

  onDelete = async () => {
    const uuid = this.state.thought.uuid;
    await deleteExercise(uuid);
    this.onNext();
    haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
  };

  render() {
    return (
      <Container
        style={{
          backgroundColor: theme.lightOffwhite,
          paddingTop: Constants.statusBarHeight + 24,
          flex: 1,
        }}
      >
        {this.state.thought && (
          <>
            <View
              style={{
                marginBottom: 18,
              }}
            >
              <MediumHeader>Summary of Thought</MediumHeader>
              <HintHeader>
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
          </>
        )}
      </Container>
    );
  }
}
