import React from "react";
import ScreenProps from "../ScreenProps";
import { View, StatusBar, Keyboard } from "react-native";
import {
  saveThought,
  getIsExistingUser,
  setIsExistingUser,
} from "../thoughtstore";
import { SavedThought, newThought, Thought } from "../thoughts";
import ThoughtCard, { THOUGHT_CARD_HIDDEN_HEIGHT } from "./ThoughtCard";
import {
  DISTORTION_SCREEN,
  FINISHED_SCREEN,
  FOLLOW_UP_NOTE_SCREEN,
  CHECKUP_SUMMARY_SCREEN,
} from "./screens";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as stats from "../stats";
import Constants from "expo-constants";
import theme from "../theme";
import { get } from "lodash";
import followUpState from "./followups/followUpState";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import ExerciseList from "./ExerciseList";
import { getSortedExerciseGroups, ExerciseGroup } from "../exercises/exercises";
import CheckupPrompt from "./CheckupPrompt";
import { CHECKUP_SCREEN } from "../screens";
import { getNextCheckupDate, Checkup } from "../checkups/checkupstore";
import dayjs from "dayjs";

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

    this.props.navigation.addListener("willFocus", args => {
      this.loadExercises();
      this.loadShouldPromptCheckup();

      const thought = get(args, "action.params.thought", newThought());
      const isEditing = get(args, "action.params.isEditing", false);
      this.setState({
        thought,
        isEditing,
        hasCheckedEditing: true,
      });

      const isRequestingPopUp = get(
        args,
        "action.params.isRequestingPopUp",
        false
      );
      if (isEditing || isRequestingPopUp) {
        this.popUp();
      }
    });

    /// wiggle card
    setTimeout(() => {
      this.setState({ cardPosition: "hiddenWiggle" });
    }, 250);
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

  popUp = () => {
    this.setState({
      cardPosition: "peak",
    });

    // Trigger the fade-in effect of the background overlay
    setTimeout(() => {
      this.setState({
        shouldFadeInBackgroundOverlay: true,
      });
    }, 200);
  };

  popDown = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    Keyboard.dismiss();
    this.setState({
      cardPosition: "hiddenWiggle",
      shouldFadeInBackgroundOverlay: false,
      isEditing: false,
    });
  };

  render() {
    const {
      groups,
      areExercisesLoaded,
      hasCheckedEditing,
      thought,
      cardPosition,
      isEditing,
      shouldFadeInBackgroundOverlay,
    } = this.state;

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
            <ThoughtCard
              onNext={this.navigateToDistortionScreenWithThought}
              thought={thought}
              onChange={this.onChangeAutomaticThought}
              isEditing={isEditing}
              onFinish={this.onFinishEditing}
              cardPosition={cardPosition}
              shouldFadeInBackgroundOverlay={shouldFadeInBackgroundOverlay}
              onPopUp={this.popUp}
              onPopDown={this.popDown}
            />
            <InvertibleScrollView
              inverted
              style={{
                backgroundColor: theme.lightOffwhite,
                marginBottom: THOUGHT_CARD_HIDDEN_HEIGHT - TAB_BAR_HEIGHT,
              }}
            >
              {this.state.shouldPromptCheckup && (
                <CheckupPrompt
                  onPress={() => {
                    this.props.navigation.navigate(CHECKUP_SCREEN);
                    haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
                  }}
                />
              )}

              <ExerciseList
                groups={groups}
                historyButtonLabel={"alternative-thought"}
                navigateToThoughtViewer={this.navigateToViewerWithThought}
                navigateToCheckupViewer={this.navigateToCheckupViewer}
              />
            </InvertibleScrollView>
          </>
        )}
      </View>
    );
  }
}
