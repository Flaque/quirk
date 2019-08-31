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
  GhostButton,
  Row,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  View,
  Alert,
} from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { Prediction, deletePrediction } from "./predictionstore";
import { get } from "lodash";
import dayjs from "dayjs";
import {
  ASSUMPTION_SCREEN,
  ASSUMPTION_NOTE_SCREEN,
  THOUGHT_SCREEN,
  PREDICTION_FOLLOW_UP_SCREEN,
} from "../screens";
import { resetNavigationTo } from "../../resetNavigationTo";
import { getPredictionState } from "./results";

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
    haptic.notification(Haptic.NotificationFeedbackType.Success);
    resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
  };

  onDelete = async () => {
    Alert.alert("Delete your prediction?", "This can't be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deletePrediction(this.state.prediction.uuid);
          haptic.impact(Haptic.ImpactFeedbackStyle.Heavy);
          resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
        },
        style: "destructive",
      },
    ]);
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
            paddingBottom: 64,
          }}
        >
          {getPredictionState(this.state.prediction) === "waiting" && (
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
                  isEditing: true,
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
                  isEditing: true,
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
                  isEditing: true,
                });
              }}
            >
              <Paragraph>
                {this.state.prediction.predictedExperienceNote ||
                  "🤷‍ Left blank 🤷‍"}
              </Paragraph>
            </GhostButtonWithGuts>
          </View>

          <View
            style={{
              marginBottom: 12,
            }}
          >
            <SubHeader>Following up at</SubHeader>
            <Paragraph
              style={{
                marginBottom: 12,
              }}
            >
              {dayjs(this.state.prediction.followUpAt).format(
                "D MMM YYYY, h:mm a"
              )}
            </Paragraph>

            <GhostButton
              title="Follow up now"
              borderColor={theme.lightGray}
              onPress={() => {
                this.props.navigation.navigate(PREDICTION_FOLLOW_UP_SCREEN, {
                  prediction: this.state.prediction,
                });
              }}
            />
          </View>

          <Row
            style={{
              marginTop: 24,
            }}
          >
            <GhostButton
              title="Delete"
              borderColor={theme.red}
              textColor={theme.red}
              style={{
                marginRight: 12,
              }}
              onPress={this.onDelete}
            />

            <ActionButton
              style={{
                flex: 1,
              }}
              title="Finish"
              onPress={this.onFinish}
            />
          </Row>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
