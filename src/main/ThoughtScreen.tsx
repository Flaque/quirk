import React from "react";
import ScreenProps from "../ScreenProps";
import { View, StatusBar } from "react-native";
import {
  saveThought,
  getIsExistingUser,
  setIsExistingUser,
} from "../thoughtstore";
import { SavedThought, newThought, Thought } from "../thoughts";
import {
  DISTORTION_SCREEN,
  FINISHED_SCREEN,
  FOLLOW_UP_NOTE_SCREEN,
  CHECKUP_SUMMARY_SCREEN,
  ASSUMPTION_SCREEN,
  AUTOMATIC_THOUGHT_SCREEN,
  PREDICTION_SUMMARY_SCREEN,
  PREDICTION_FOLLOW_UP_SCREEN,
  PREDICTION_ONBOARDING_SCREEN,
  SURVEY_SCREEN,
} from "./screens";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as stats from "../stats";
import Constants from "expo-constants";
import theme from "../theme";
import { get } from "lodash";
import followUpState from "./followups/followUpState";
import ExerciseList from "./ExerciseList";
import { getSortedExerciseGroups, ExerciseGroup } from "../exercises/exercises";
import CheckupPrompt from "./CheckupPrompt";
import { CHECKUP_SCREEN } from "../screens";
import { getNextCheckupDate, Checkup } from "../checkups/checkupstore";
import dayjs from "dayjs";
import ExerciseButton from "./ExerciseButton";
import { Prediction } from "./predictions/predictionstore";
import { getPredictionState } from "./predictions/results";
import {
  userStartedPrediction,
  userFollowedUpOnPrediction,
} from "./predictions/stats";
import { Label } from "../ui";
import * as flagstore from "../flagstore";
import SurveyPrompt from "./survey/SurveyPrompt";
import { passesFeatureFlag, passesDayFilter } from "../featureflags";

export default class MainScreen extends React.Component<
  ScreenProps,
  {
    areExercisesLoaded: boolean;
    hasCheckedEditing: boolean;
    groups: ExerciseGroup[];
    thought?: Thought;
    isEditing: boolean;
    cardPosition: "hidden" | "hiddenWiggle" | "peak" | "full";
    shouldFadeInBackgroundOverlay: boolean;
    shouldPromptCheckup: boolean;
    shouldPromptSurvey: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      areExercisesLoaded: false,
      hasCheckedEditing: false,
      groups: [],
      thought: undefined,
      cardPosition: "hidden",
      isEditing: false,
      shouldFadeInBackgroundOverlay: false,
      shouldPromptCheckup: false,
      shouldPromptSurvey: false,
    };
  }

  componentDidMount() {
    // Record new users
    getIsExistingUser().then(isExisting => {
      // New Users
      if (!isExisting) {
        stats.newuser();
        setIsExistingUser();
      }
    });

    this.loadExercises();
    this.loadShouldPromptCheckup();
    this.loadShouldShowSurveyPrompt();

    this.props.navigation.addListener("willFocus", args => {
      this.loadExercises();
      this.loadShouldPromptCheckup();
      this.loadShouldShowSurveyPrompt();

      const thought = get(args, "action.params.thought", newThought());
      const isEditing = get(args, "action.params.isEditing", false);
      this.setState({
        thought,
        isEditing,
        hasCheckedEditing: true,
      });
    });
  }

  loadShouldPromptCheckup = async () => {
    const date = await getNextCheckupDate();
    this.setState({
      shouldPromptCheckup: dayjs().isAfter(dayjs(date)),
    });
  };

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

  navigateToViewerWithThought = (thought: SavedThought) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Follow-ups
    if (followUpState(thought) === "ready") {
      stats.userStartedFollowUp();
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

  navigateToDistortionScreenWithThought = async (thought: Thought) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    stats.thoughtRecorded();

    const savedThought = await saveThought(thought);
    this.props.navigation.push(DISTORTION_SCREEN, {
      thought: savedThought,
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

  dismissSurveyPrompt = async () => {
    await flagstore.setTrue("has-been-surveyed");
    this.setState({
      shouldPromptSurvey: false,
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

  onChangeAutomaticThought = (txt: string) => {
    this.setState(prevState => {
      if (!prevState.thought) {
        return prevState;
      }

      prevState.thought.automaticThought = txt;
      return prevState;
    });
  };

  onFinishEditing = async (thought: Thought) => {
    const savedThought = await saveThought(thought);
    this.props.navigation.push(FINISHED_SCREEN, {
      thought: savedThought,
    });
  };

  render() {
    const { groups, areExercisesLoaded, hasCheckedEditing } = this.state;

    return (
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
        }}
      >
        <StatusBar barStyle="dark-content" hidden={false} />

        {areExercisesLoaded && hasCheckedEditing && (
          <>
            <InvertibleScrollView
              inverted
              style={{
                backgroundColor: theme.lightOffwhite,
              }}
            >
              <View
                style={{
                  backgroundColor: theme.offwhite,
                  padding: 24,
                  borderTopColor: theme.lightGray,
                  borderTopWidth: 1,
                }}
              >
                <Label>Exercises</Label>
                <ExerciseButton
                  title="New Prediction"
                  hint="Manage anxiety around upcoming events or tasks."
                  featherIconName="cloud-drizzle"
                  onPress={async () => {
                    userStartedPrediction();

                    if (
                      !(await flagstore.get(
                        "has-seen-prediction-onboarding",
                        "false"
                      ))
                    ) {
                      this.props.navigation.navigate(
                        PREDICTION_ONBOARDING_SCREEN
                      );
                      flagstore.setTrue("has-seen-prediction-onboarding");
                      return;
                    }

                    this.props.navigation.navigate(ASSUMPTION_SCREEN);
                  }}
                />
                <ExerciseButton
                  title="New Automatic Thought"
                  hint="Challenge your in-the-moment automatic negative thoughts."
                  featherIconName="message-square"
                  onPress={() => {
                    this.props.navigation.navigate(AUTOMATIC_THOUGHT_SCREEN);
                  }}
                />
              </View>
              {this.state.shouldPromptCheckup && (
                <CheckupPrompt
                  onPress={() => {
                    this.props.navigation.navigate(CHECKUP_SCREEN);
                    haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
                  }}
                />
              )}

              {this.state.shouldPromptSurvey &&
                !this.state.shouldPromptCheckup && (
                  <SurveyPrompt
                    onPressYes={this.navigateToSurveyScreen}
                    onPressNo={this.dismissSurveyPrompt}
                  />
                )}

              <ExerciseList
                groups={groups}
                historyButtonLabel={"alternative-thought"}
                navigateToThoughtViewer={this.navigateToViewerWithThought}
                navigateToCheckupViewer={this.navigateToCheckupViewer}
                navigateToPredictionViewer={this.navigateToPredictionViewer}
              />
            </InvertibleScrollView>
          </>
        )}
      </View>
    );
  }
}
