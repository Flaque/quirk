import React from "react";
import ScreenProps from "../ScreenProps";
import { View } from "react-native";
import { getExercises, saveExercise } from "../thoughtstore";
import {
  SavedThought,
  ThoughtGroup,
  groupThoughtsByDay,
  newThought,
} from "../thoughts";
import { validThoughtGroup } from "../sanitize";
import parseThoughts from "./parseThoughts";
import ThoughtList from "./ThoughtList";
import ThoughtCard from "./ThoughtCard";
import { DISTORTION_SCREEN, FINISHED_SCREEN } from "./screens";
import haptic from "../haptic";
import { Haptic } from "expo";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as stats from "../stats";

export default class MainScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    groups: [],
  };

  componentDidMount() {
    this.loadExercises();
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
          isReady: true,
        });
      });
  };

  navigateToViewerWithThought = (thought: SavedThought) => {
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought,
    });
  };

  navigateToDistortionScreenWithThought = async (automaticThought: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    stats.thoughtRecorded();

    const newbie = newThought();
    newbie.automaticThought = automaticThought;
    const savedThought = await saveExercise(newbie);
    this.props.navigation.push(DISTORTION_SCREEN, {
      thought: savedThought,
    });
  };

  render() {
    const { groups, isReady } = this.state;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ThoughtCard onNext={this.navigateToDistortionScreenWithThought} />

        {isReady && (
          <InvertibleScrollView inverted>
            <ThoughtList
              groups={groups}
              historyButtonLabel={"alternative-thought"}
              navigateToViewer={this.navigateToViewerWithThought}
              // onItemDelete={this.onItemDelete}
            />
          </InvertibleScrollView>
        )}
      </View>
    );
  }
}
