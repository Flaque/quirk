import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  SubHeader,
  RoundedSelectorButton,
  ActionButton,
  Paragraph,
} from "../../ui";
import { get } from "lodash";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { PREDICTION_SUMMARY_SCREEN } from "../screens";
import { Prediction, savePrediction } from "./predictionstore";
import { userRecordedActualExperience } from "./stats";
import { TextInput } from "../../textInputStyle";
import { FINISH_PREDICTION } from "../pulse/constants";
import { scheduleBoost } from "../pulse/pulsestore";

export default class PredictionFollowUpScreen extends React.Component<
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
    await savePrediction(this.state.prediction);

    userRecordedActualExperience(this.state.prediction.actualExperience);

    await scheduleBoost(FINISH_PREDICTION);

    this.props.navigation.navigate(PREDICTION_SUMMARY_SCREEN, {
      prediction: this.state.prediction,
    });
  };

  onFelt = async (felt: "bad" | "neutral" | "good") => {
    this.setState(prevState => {
      prevState.prediction.actualExperience = felt;
      return prevState;
    });
  };

  onChangeNote = async (note: string) => {
    this.setState(prevState => {
      prevState.prediction.actualExperienceNote = note;
      return prevState;
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
            paddingBottom: 48,
          }}
        >
          <MediumHeader>Actual Experience</MediumHeader>
          <HintHeader>How did it go?</HintHeader>

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Event or Task
          </SubHeader>
          <Paragraph>{this.state.prediction.eventLabel}</Paragraph>

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Actual Experience
          </SubHeader>
          <RoundedSelectorButton
            title="It went well 👍"
            onPress={() => this.onFelt("good")}
            selected={this.state.prediction.actualExperience === "good"}
          />
          <RoundedSelectorButton
            title="It went okay 🤷‍"
            onPress={() => this.onFelt("neutral")}
            selected={this.state.prediction.actualExperience === "neutral"}
          />
          <RoundedSelectorButton
            title="It went poorly 👎"
            onPress={() => this.onFelt("bad")}
            selected={this.state.prediction.actualExperience === "bad"}
          />

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Actual Description
          </SubHeader>
          <HintHeader>What happened?</HintHeader>
          <TextInput
            onChangeText={this.onChangeNote}
            value={this.state.prediction.actualExperienceNote}
            placeholder="ex: It was actually..."
            multiline={true}
            numberOfLines={6}
          />

          <ActionButton
            style={{
              marginTop: 12,
              marginBottom: 24,
            }}
            title="Finish"
            onPress={this.onFinish}
            width={"100%"}
            disabled={!this.state.prediction.actualExperience}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
