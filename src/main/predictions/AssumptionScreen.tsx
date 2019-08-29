import React from "react";
import theme from "../../theme";
import { MediumHeader, HintHeader, SubHeader, ActionButton } from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { TextInput } from "../../textInputStyle";
import { ASSUMPTION_NOTE_SCREEN } from "../screens";
import { Prediction, newPrediction, savePrediction } from "./predictionstore";
import { get } from "lodash";

export default class AssumptionScreen extends React.Component<
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
    this.setState({
      prediction: newPrediction(),
    });

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
    // Don't continue if we don't have an event label
    if (
      !this.state.prediction.eventLabel ||
      this.state.prediction.eventLabel === ""
    ) {
      return;
    }

    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    await savePrediction(this.state.prediction);
    this.props.navigation.navigate(ASSUMPTION_NOTE_SCREEN, {
      prediction: this.state.prediction,
    });
  };

  onChange = async (label: string) => {
    this.setState(prevState => {
      prevState.prediction.eventLabel = label;
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
            paddingBottom: 24,
          }}
        >
          <MediumHeader>New Prediction 🔮</MediumHeader>
          <HintHeader>
            Predict your experience of an upcoming event and we’ll follow-up
            later to see if you were correct.
          </HintHeader>

          <SubHeader>Event or Task</SubHeader>
          <TextInput
            onChangeText={this.onChange}
            value={this.state.prediction.eventLabel}
            placeholder="ex: giving a presentation in front of..."
            multiline={true}
            numberOfLines={6}
          />

          <ActionButton
            style={{
              marginTop: 12,
            }}
            title="Continue"
            onPress={this.onFinish}
            width={"100%"}
            disabled={!this.state.prediction.eventLabel}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
