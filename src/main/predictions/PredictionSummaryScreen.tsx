import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  SubHeader,
  GhostButtonWithGuts,
  Paragraph,
  Badge,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  View,
} from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { Prediction } from "./predictionstore";
import { get } from "lodash";
import dayjs from "dayjs";
import {
  ASSUMPTION_SCREEN,
  ASSUMPTION_NOTE_SCREEN,
  PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN,
  THOUGHT_SCREEN,
} from "../screens";
import { resetNavigationTo } from "../../resetNavigationTo";

const predictedExperienceText = {
  good: "Going to go well 👍",
  neutral: "Going to go okay 🤷‍",
  bad: "Going to go poorly 👎",
};

export default class PredictionSummaryScreen extends React.Component<
  ScreenProps,
  {
    prediction?: Prediction;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    prediction: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const prediction = get(args, "action.params.prediction");
      if (prediction) {
        this.setState({
          prediction,
        });
      }
    });
  }

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
  };

  render() {
    if (!this.state.prediction) {
      return null;
    }

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
          {dayjs().isBefore(this.state.prediction.followUpAt) && (
            <Badge
              text="Follow up scheduled"
              featherIconName="clipboard"
              style={{
                marginBottom: 18,
              }}
            />
          )}

          <MediumHeader>Summary of Prediction</MediumHeader>
          <HintHeader
            style={{
              marginBottom: 24,
            }}
          >
            {dayjs(this.state.prediction.createdAt).format(
              "D MMM YYYY, h:mm a"
            )}
          </HintHeader>

          <View
            style={{
              marginBottom: 12,
            }}
          >
            <SubHeader>Event or Task</SubHeader>
            <GhostButtonWithGuts
              borderColor={theme.lightGray}
              onPress={() => {
                this.props.navigation.navigate(ASSUMPTION_SCREEN, {
                  prediction: this.state.prediction,
                });
              }}
            >
              <Paragraph>{this.state.prediction.eventLabel}</Paragraph>
            </GhostButtonWithGuts>
          </View>

          <View
            style={{
              marginBottom: 12,
            }}
          >
            <SubHeader>Predicted Experience</SubHeader>

            <GhostButtonWithGuts
              borderColor={theme.lightGray}
              onPress={() => {
                this.props.navigation.navigate(ASSUMPTION_NOTE_SCREEN, {
                  prediction: this.state.prediction,
                });
              }}
              style={{
                marginBottom: 6,
              }}
            >
              <Paragraph>
                {
                  predictedExperienceText[
                    this.state.prediction.predictedExperience
                  ]
                }
              </Paragraph>
            </GhostButtonWithGuts>

            <GhostButtonWithGuts
              borderColor={theme.lightGray}
              onPress={() => {
                this.props.navigation.navigate(ASSUMPTION_SCREEN, {
                  prediction: this.state.prediction,
                });
              }}
            >
              <Paragraph>
                {this.state.prediction.predictedExperienceNote}
              </Paragraph>
            </GhostButtonWithGuts>
          </View>

          <View
            style={{
              marginBottom: 12,
            }}
          >
            <SubHeader>Following up at</SubHeader>
            <GhostButtonWithGuts
              borderColor={theme.lightGray}
              onPress={() => {
                this.props.navigation.navigate(
                  PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN,
                  {
                    prediction: this.state.prediction,
                  }
                );
              }}
            >
              <Paragraph>
                {dayjs(this.state.prediction.followUpAt).format(
                  "D MMM YYYY, h:mm a"
                )}
              </Paragraph>
            </GhostButtonWithGuts>
          </View>

          <ActionButton
            style={{
              marginTop: 18,
            }}
            title="Finish"
            onPress={this.onFinish}
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
