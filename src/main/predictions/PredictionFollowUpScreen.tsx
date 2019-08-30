import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  SubHeader,
  RoundedSelectorButton,
  ActionButton,
} from "../../ui";
import { get } from "lodash";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { TextInput } from "../../textInputStyle";
import {
  PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN,
  PREDICTION_SUMMARY_SCREEN,
} from "../screens";
import { Prediction, savePrediction } from "./predictionstore";

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
    this.props.navigation.navigate(PREDICTION_SUMMARY_SCREEN, {
      prediction: this.state.prediction,
    });
  };

  onFelt = async (felt: "bad" | "neutral" | "good") => {
    this.setState(prevState => {
      prevState.prediction.predictedExperience = felt;
      return prevState;
    });
  };

  onChangeNote = async (note: string) => {
    this.setState(prevState => {
      prevState.prediction.predictedExperienceNote = note;
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
          <MediumHeader>Predicted Experience</MediumHeader>
          <HintHeader>How do you think this will go?</HintHeader>

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Expected Experience
          </SubHeader>
          <RoundedSelectorButton
            title="Going to go well 👍"
            onPress={() => this.onFelt("good")}
            selected={this.state.prediction.predictedExperience === "good"}
          />
          <RoundedSelectorButton
            title="Going to go okay 🤷‍"
            onPress={() => this.onFelt("neutral")}
            selected={this.state.prediction.predictedExperience === "neutral"}
          />
          <RoundedSelectorButton
            title="Going to go poorly 👎"
            onPress={() => this.onFelt("bad")}
            selected={this.state.prediction.predictedExperience === "bad"}
          />

          <SubHeader
            style={{
              marginTop: 12,
            }}
          >
            Thought
          </SubHeader>
          <HintHeader>
            In your own words, describe what you think might happen.
          </HintHeader>
          <TextInput
            onChangeText={this.onChangeNote}
            value={this.state.prediction.predictedExperienceNote}
            placeholder="ex: giving a presentation in front of..."
            multiline={true}
            numberOfLines={6}
          />

          <ActionButton
            style={{
              marginTop: 12,
              marginBottom: 24,
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
