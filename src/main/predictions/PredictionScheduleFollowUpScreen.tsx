import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  RoundedSelectorButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import {
  PREDICTION_SUMMARY_SCREEN,
  PREDICTION_REDIRECT_SCREEN,
} from "../screens";
import { Prediction, savePrediction } from "./predictionstore";
import { get } from "lodash";
import scheduleNotification from "../../notifications/scheduleNotification";
import { PREDICTION_ONESIGNAL_TEMPLATE } from "../followups/templates";
import dayjs from "dayjs";
import { userScheduledPredictionFollowUp } from "./stats";
import { scheduleBoost } from "../pulse/pulsestore";
import { START_PREDICTION } from "../pulse/constants";

type FollowUpSelections =
  | "+3 hours"
  | "+1 day"
  | "+5 days"
  | "+30 days"
  | string;

export default class PredictionScheduleFollowUpScreen extends React.Component<
  ScreenProps,
  {
    followUpOn: FollowUpSelections;
    prediction?: Prediction;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    followUpOn: "+1 day",
    prediction: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const prediction = get(args, "state.params.prediction");
      if (prediction) {
        this.setState({
          prediction,
        });
      }
    });
  }

  getFollowUpDate = (): string => {
    if (this.state.followUpOn === "+3 hours") {
      return dayjs()
        .add(3, "hour")
        .toISOString();
    }

    if (this.state.followUpOn === "+1 day") {
      return dayjs()
        .add(1, "day")
        .toISOString();
    }

    if (this.state.followUpOn === "+5 days") {
      return dayjs()
        .add(5, "day")
        .toISOString();
    }

    if (this.state.followUpOn === "+30 days") {
      return dayjs()
        .add(30, "day")
        .toISOString();
    }

    return dayjs(this.state.followUpOn).toISOString();
  };

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    const followUpDate = this.getFollowUpDate();
    scheduleNotification(followUpDate, PREDICTION_ONESIGNAL_TEMPLATE);

    const prediction = this.state.prediction;
    prediction.followUpAt = followUpDate;
    await savePrediction(prediction);

    userScheduledPredictionFollowUp(this.state.followUpOn);

    await scheduleBoost(START_PREDICTION);

    if (prediction.predictedExperience === "bad") {
      this.props.navigation.navigate(PREDICTION_REDIRECT_SCREEN, {
        prediction,
      });
      return;
    }

    this.props.navigation.navigate(PREDICTION_SUMMARY_SCREEN, {
      prediction,
    });
  };

  onSelect = async (followUpOn: FollowUpSelections) => {
    this.setState({
      followUpOn,
    });
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
          <MediumHeader>Schedule Follow Up</MediumHeader>
          <HintHeader>
            We'll follow up in the future to see if your prediction came true.
          </HintHeader>

          <RoundedSelectorButton
            title="+3 hours from now"
            onPress={() => this.onSelect("+3 hours")}
            selected={this.state.followUpOn === "+3 hours"}
          />
          <RoundedSelectorButton
            title="Tomorrow"
            onPress={() => this.onSelect("+1 day")}
            selected={this.state.followUpOn === "+1 day"}
          />
          <RoundedSelectorButton
            title="+5 days from now"
            onPress={() => this.onSelect("+5 days")}
            selected={this.state.followUpOn === "+5 days"}
          />
          <RoundedSelectorButton
            title="+30 days from now"
            onPress={() => this.onSelect("+30 days")}
            selected={this.state.followUpOn === "+30 days"}
          />

          <ActionButton
            style={{
              marginTop: 12,
            }}
            title="Continue"
            onPress={this.onFinish}
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
