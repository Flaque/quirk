import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  RoundedSelectorButton,
  GhostButton,
  GhostButtonWithGuts,
  Paragraph,
  Label,
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
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    customDate?: string;
    showCustomDate: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    followUpOn: "+1 day",
    prediction: undefined,
    customDate: "2016-05-15",
    showCustomDate: false,
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

  onSelectAdditionDate = async (followUpOn: FollowUpSelections) => {
    this.setState({
      showCustomDate: false,
      followUpOn,
    });
  };

  onSelectCustomDate = async () => {
    this.setState({
      showCustomDate: true,
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
            onPress={() => this.onSelectAdditionDate("+3 hours")}
            selected={
              this.state.followUpOn === "+3 hours" && !this.state.showCustomDate
            }
          />
          <RoundedSelectorButton
            title="+24 hours from now"
            onPress={() => this.onSelectAdditionDate("+1 day")}
            selected={
              this.state.followUpOn === "+1 day" && !this.state.showCustomDate
            }
          />
          <RoundedSelectorButton
            title="+5 days from now"
            onPress={() => this.onSelectAdditionDate("+5 days")}
            selected={
              this.state.followUpOn === "+5 days" && !this.state.showCustomDate
            }
          />
          <RoundedSelectorButton
            title="+30 days from now"
            onPress={() => this.onSelectAdditionDate("+30 days")}
            selected={
              this.state.followUpOn === "+30 days" && !this.state.showCustomDate
            }
          />
          <GhostButtonWithGuts
            onPress={this.onSelectCustomDate}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: this.state.showCustomDate ? theme.blue : "white",
              borderColor: this.state.showCustomDate
                ? theme.darkBlue
                : theme.lightGray,
            }}
          >
            <Paragraph
              style={{
                fontWeight: "700",
                color: this.state.showCustomDate ? "white" : theme.darkText,
              }}
            >
              Select a Date
            </Paragraph>
            <Feather
              name={this.state.showCustomDate ? "check" : "calendar"}
              color={this.state.showCustomDate ? "white" : theme.blue}
              size={16}
            />
          </GhostButtonWithGuts>

          {this.state.showCustomDate && (
            <DateTimePicker
              onChange={() => {}}
              value={new Date("2020-06-12T14:42:42")}
              minimumDate={new Date()}
            />
          )}

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
