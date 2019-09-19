import React from "react";
import {
  FINISHED_SCREEN,
  FOLLOW_UP_NOTE_SCREEN,
  CHECKUP_SUMMARY_SCREEN,
  PREDICTION_SUMMARY_SCREEN,
  PREDICTION_FOLLOW_UP_SCREEN,
  SURVEY_SCREEN,
} from "../screens";
import haptic from "../../haptic";
import * as Haptic from "expo-haptics";
import ExerciseList from "../exercises/ExerciseList";
import CheckupPrompt from "../CheckupPrompt";
import { CHECKUP_SCREEN } from "../../screens";
import { userFollowedUpOnPrediction } from "../predictions/stats";
import * as flagstore from "../../flagstore";
import SurveyPrompt from "../survey/SurveyPrompt";
import {
  NavigationScreenProp,
  NavigationAction,
  NavigationState,
} from "react-navigation";
import { getNextCheckupDate, Checkup } from "../../checkups/checkupstore";
import dayjs from "dayjs";
import { passesDayFilter, passesFeatureFlag } from "../../featureflags";
import { getSortedExerciseGroups, ExerciseGroup } from "../exercises/exercises";
import { Prediction } from "../predictions/predictionstore";
import { getPredictionState } from "../predictions/results";
import followUpState from "../followups/followUpState";
import { SavedThought } from "../../thoughts";
import { userStartedFollowUp, userDismissedSurvey } from "../../stats";
import { FadesIn } from "../../animations";

export default class Feed extends React.Component<
  {
    navigation: NavigationScreenProp<NavigationState, NavigationAction>;
  },
  {
    shouldFadeIn: boolean;
    shouldPromptSurvey: boolean;
    shouldPromptCheckup: boolean;
    groups: ExerciseGroup[];
    areExercisesLoaded: boolean;
  }
> {
  state = {
    shouldFadeIn: false,
    shouldPromptSurvey: false,
    shouldPromptCheckup: false,
    groups: [],
    areExercisesLoaded: false,
  };

  componentDidMount() {
    this.loadExercises();
    this.loadShouldPromptCheckup();
    this.loadShouldShowSurveyPrompt();

    setTimeout(
      () =>
        this.setState({
          shouldFadeIn: true,
        }),
      150
    );
  }

  loadExercises = () => {
    getSortedExerciseGroups()
      .then(groups => {
        this.setState({ groups });
      })
      .catch(console.error)
      .finally(() => {
        this.setState({
          areExercisesLoaded: true,
        });
      });
  };

  loadShouldPromptCheckup = async () => {
    const date = await getNextCheckupDate();
    this.setState({
      shouldPromptCheckup: dayjs().isAfter(dayjs(date)),
    });
  };

  loadShouldShowSurveyPrompt = async () => {
    const isDayToShow = await passesDayFilter(3);
    if (!isDayToShow) {
      this.setState({
        shouldPromptSurvey: false,
      });
      return;
    }

    const passes = await passesFeatureFlag("disappointed-survey", 2);
    if (!passes) {
      this.setState({
        shouldPromptSurvey: false,
      });
      return;
    }

    if (await flagstore.get("has-been-surveyed", "false")) {
      this.setState({
        shouldPromptSurvey: false,
      });
      return;
    }

    this.setState({
      shouldPromptSurvey: true,
    });
  };

  navigateToCheckupViewer = async (checkup: Checkup) => {
    this.props.navigation.push(CHECKUP_SUMMARY_SCREEN, {
      checkup,
    });
  };

  navigateToPredictionViewer = async (prediction: Prediction) => {
    if (getPredictionState(prediction) === "ready") {
      userFollowedUpOnPrediction(false);
      this.props.navigation.navigate(PREDICTION_FOLLOW_UP_SCREEN, {
        prediction,
      });
      return;
    }

    this.props.navigation.navigate(PREDICTION_SUMMARY_SCREEN, {
      prediction,
    });
  };

  navigateToSurveyScreen = async () => {
    await flagstore.setTrue("has-been-surveyed");
    this.props.navigation.navigate(SURVEY_SCREEN);
  };

  navigateToViewerWithThought = (thought: SavedThought) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Follow-ups
    if (followUpState(thought) === "ready") {
      userStartedFollowUp();
      this.props.navigation.navigate(FOLLOW_UP_NOTE_SCREEN, {
        thought,
      });
      return;
    }

    // Regular finished screen
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought,
    });
  };

  dismissSurveyPrompt = async () => {
    await flagstore.setTrue("has-been-surveyed");
    this.setState({
      shouldPromptSurvey: false,
    });
    userDismissedSurvey();
  };

  render() {
    return (
      <FadesIn pose={this.state.shouldFadeIn ? "visible" : "hidden"}>
        <ExerciseList
          groups={this.state.groups}
          historyButtonLabel={"alternative-thought"}
          navigateToThoughtViewer={this.navigateToViewerWithThought}
          navigateToCheckupViewer={this.navigateToCheckupViewer}
          navigateToPredictionViewer={this.navigateToPredictionViewer}
        />

        {this.state.shouldPromptCheckup && (
          <CheckupPrompt
            onPress={() => {
              this.props.navigation.navigate(CHECKUP_SCREEN);
              haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
            }}
          />
        )}

        {this.state.shouldPromptSurvey && !this.state.shouldPromptCheckup && (
          <SurveyPrompt
            onPressYes={this.navigateToSurveyScreen}
            onPressNo={this.dismissSurveyPrompt}
          />
        )}
      </FadesIn>
    );
  }
}
