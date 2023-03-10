import React from "react";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import theme from "../../theme";
import { ActionButton, MediumHeader, HintHeader, GhostButton } from "../../ui";
import { ScrollView, StatusBar } from "react-native";
import { THOUGHT_SCREEN, AUTOMATIC_THOUGHT_SCREEN } from "../screens";
import { newThought } from "../../thoughts";
import { get } from "lodash";
import { Prediction } from "./predictionstore";

export default class PredictionThoughtRedirectScreen extends React.Component<
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

  onChallenge = () => {
    const thought = newThought();
    thought.automaticThought = `${this.state.prediction.eventLabel} - ${this
      .state.prediction.predictedExperienceNote || ""}`;

    this.props.navigation.navigate(AUTOMATIC_THOUGHT_SCREEN, {
      thought,
    });
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

  render() {
    if (!this.state.prediction) {
      return null;
    }

    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          paddingHorizontal: 24,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <StatusBar hidden={false} />

        <MediumHeader>You should challenge this thought.</MediumHeader>
        <HintHeader>
          Challenging the thought can help you overcome anxiety around this
          event or task.
        </HintHeader>

        <ActionButton
          style={{
            marginTop: 12,
          }}
          width="100%"
          title="Okay, let's challenge it"
          onPress={this.onChallenge}
        />

        <GhostButton
          style={{
            marginTop: 6,
          }}
          width="100%"
          title="No thanks"
          onPress={() => {
            this.props.navigation.navigate(THOUGHT_SCREEN);
          }}
        />
      </ScrollView>
    );
  }
}
