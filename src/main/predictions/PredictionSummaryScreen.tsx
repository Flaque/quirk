import React from "react";
import theme from "../../theme";
import { MediumHeader, HintHeader, ActionButton } from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { THOUGHT_SCREEN } from "../screens";
import { Prediction, savePrediction } from "./predictionstore";
import { get } from "lodash";
import scheduleNotification from "../../notifications/scheduleNotification";
import { PREDICTION_ONESIGNAL_TEMPLATE } from "../followups/templates";
import dayjs from "dayjs";

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
      const prediction = get(args, "state.params.prediction");
      if (prediction) {
        this.setState({
          prediction,
        });
      }
    });
  }

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    const followUpDate = this.getFollowUpDate();
    scheduleNotification(
      dayjs()
        .add(3, "s")
        .toISOString(),
      PREDICTION_ONESIGNAL_TEMPLATE
    );

    const prediction = this.state.prediction;
    prediction.followUpAt = followUpDate;
    await savePrediction(prediction);

    this.props.navigation.navigate(THOUGHT_SCREEN);
  };

  render() {
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
