import React from "react";
import ScreenProps from "../ScreenProps";
import { View, StatusBar } from "react-native";
import {
  getExercises,
  saveExercise,
  getIsExistingUser,
  setIsExistingUser,
} from "../thoughtstore";
import {
  SavedThought,
  ThoughtGroup,
  groupThoughtsByDay,
  newThought,
  Thought,
} from "../thoughts";
import { validThoughtGroup } from "../sanitize";
import parseThoughts from "./parseThoughts";
import ThoughtList from "./ThoughtList";
import ThoughtCard from "./ThoughtCard";
import { DISTORTION_SCREEN, FINISHED_SCREEN } from "./screens";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as stats from "../stats";
import Constants from "expo-constants";
import theme from "../theme";
import { get } from "lodash";

export default class MainScreen extends React.Component<
  ScreenProps,
  {
    areExercisesLoaded: boolean;
    hasCheckedEditing: boolean;
    isEditing: boolean;
    groups: ThoughtGroup[];
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    areExercisesLoaded: false,
    hasCheckedEditing: false,
    isEditing: false,
    groups: [],
    thought: undefined,
  };

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

    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought", newThought());
      const isEditing = get(args, "state.params.isEditing", false);
      this.setState({
        thought,
        isEditing,
        hasCheckedEditing: true,
      });
    });
  }

  loadExercises = () => {
    getExercises()
      .then(data => {
        const thoughts: SavedThought[] = parseThoughts(data);
        const groups: ThoughtGroup[] = groupThoughtsByDay(thoughts).filter(
          validThoughtGroup
        );

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
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought,
    });
  };

  navigateToDistortionScreenWithThought = async (thought: Thought) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    stats.thoughtRecorded();

    const savedThought = await saveExercise(thought);
    this.props.navigation.push(DISTORTION_SCREEN, {
      thought: savedThought,
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
    const savedThought = await saveExercise(thought);
    this.props.navigation.push(FINISHED_SCREEN, {
      thought: savedThought,
    });
  };

  render() {
    const {
      groups,
      areExercisesLoaded,
      hasCheckedEditing,
      thought,
      isEditing,
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
            />
            <InvertibleScrollView
              inverted
              style={{
                backgroundColor: theme.lightOffwhite,
              }}
            >
              <ThoughtList
                groups={groups}
                historyButtonLabel={"alternative-thought"}
                navigateToViewer={this.navigateToViewerWithThought}
              />
            </InvertibleScrollView>
          </>
        )}
      </View>
    );
  }
}
