import React from "react";
import ScreenProps from "../ScreenProps";
import { View } from "react-native";
import theme from "../theme";
import { getExercises } from "../thoughtstore";
import { SavedThought, ThoughtGroup, groupThoughtsByDay } from "../thoughts";
import { validThoughtGroup } from "../sanitize";
import ThoughtList from "./ThoughtList";

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    groups: [],
  };

  loadExercises = () => {
    const fixTimestamps = (json): SavedThought => {
      const createdAt: Date = new Date(json.createdAt);
      const updatedAt: Date = new Date(json.updatedAt);
      return {
        createdAt,
        updatedAt,
        ...json,
      };
    };

    getExercises()
      .then(data => {
        const thoughts: SavedThought[] = data
          .map(([_, value]) => JSON.parse(value))
          .filter(n => n) // Worst case scenario, if bad data gets in we don't show it.
          .map(fixTimestamps);

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
    console.log("Navigate to", thought);
  };

  render() {
    const { groups } = this.state;

    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          padding: 0,
          margin: 0,
        }}
      >
        <ThoughtList
          groups={groups}
          historyButtonLabel={"alternative-thought"}
          navigateToViewer={this.navigateToViewerWithThought}
          // onItemDelete={this.onItemDelete}
        />
      </View>
    );
  }
}
