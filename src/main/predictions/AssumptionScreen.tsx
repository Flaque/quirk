import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  SubHeader,
  ActionButton,
  Row,
  GhostButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { TextInput } from "../../textInputStyle";
import {
  ASSUMPTION_NOTE_SCREEN,
  THOUGHT_SCREEN,
  PREDICTION_SUMMARY_SCREEN,
} from "../screens";
import { Prediction, newPrediction, savePrediction } from "./predictionstore";
import { get } from "lodash";
import { userRecordedPredictionEvent } from "./stats";

export default class AssumptionScreen extends React.Component<
  ScreenProps,
  {
    prediction?: Prediction;
    isEditing?: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    prediction: undefined,
    isEditing: false,
  };

  componentDidMount() {
    this.setState({
      prediction: newPrediction(),
      isEditing: false,
    });

    this.props.navigation.addListener("willFocus", args => {
      const prediction = get(args, "action.params.prediction");
      const isEditing = get(args, "action.params.isEditing", false);
      if (prediction) {
        this.setState({
          prediction,
          isEditing,
        });
      }
    });
  }

  onChange = async (label: string) => {
    this.setState(prevState => {
      prevState.prediction.eventLabel = label;
      return prevState;
    });
  };

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

    if (this.state.isEditing) {
      this.props.navigation.navigate(PREDICTION_SUMMARY_SCREEN, {
        prediction: this.state.prediction,
      });
      return;
    }

    userRecordedPredictionEvent();
    this.props.navigation.navigate(ASSUMPTION_NOTE_SCREEN, {
      prediction: this.state.prediction,
    });
  };

  renderButtons = () => {
    if (this.state.isEditing) {
      return (
        <Row
          style={{
            marginTop: 12,
          }}
        >
          <ActionButton
            style={{
              flex: 1,
            }}
            title="Finish"
            onPress={this.onFinish}
            disabled={!this.state.prediction.eventLabel}
          />
        </Row>
      );
    }

    return (
      <Row
        style={{
          marginTop: 12,
        }}
      >
        <GhostButton
          onPress={() => this.props.navigation.navigate(THOUGHT_SCREEN)}
          title="Cancel"
          style={{
            marginRight: 12,
          }}
        />
        <ActionButton
          style={{
            flex: 1,
          }}
          title="Continue"
          onPress={this.onFinish}
          disabled={!this.state.prediction.eventLabel}
        />
      </Row>
    );
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

          {this.renderButtons()}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
