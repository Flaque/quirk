import React from "react";
import ScreenProps from "../ScreenProps";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";
import theme from "../theme";
import { getExercises } from "../thoughtstore";
import { SavedThought, ThoughtGroup, groupThoughtsByDay } from "../thoughts";
import { validThoughtGroup } from "../sanitize";
import { MediumHeader, HintHeader } from "../ui";
import parseThoughts from "./parseThoughts";
import { newPopsUp } from "../animations";
import ThoughtList from "./ThoughtList";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";

const CardPopsUp = newPopsUp({
  fullHeight: Dimensions.get("screen").height / 2,
  hiddenHeight: 256,
  popUpScale: 1.1,
});

class ThoughtCard extends React.Component<{
  style?: any;
}> {
  state = {
    view: "hidden",
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ view: "hiddenWiggle" });
    }, 350);
  }

  render() {
    const { style } = this.props;
    const { view } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ view: "peak" });
        }}
      >
        <CardPopsUp
          style={{
            position: "absolute",
            width: "100%",
            height: 1000,
            padding: 24,
            bottom: -TAB_BAR_HEIGHT,
            borderRadius: 13,
            backgroundColor: "white",
            borderColor: theme.lightGray,
            borderWidth: 2,
            shadowColor: theme.gray,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 10,
            shadowOpacity: 0.8,
            opacity: 1,
            zIndex: 99,
            ...style,
          }}
          pose={this.state.view}
        >
          <MediumHeader>Automatic Thought</MediumHeader>
          <HintHeader>
            What's the situation and what's your first thought?
          </HintHeader>
        </CardPopsUp>
      </TouchableWithoutFeedback>
    );
  }
}

export default class MainScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    groups: [],
  };

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
    console.log("Navigate to", thought);
  };

  render() {
    const { groups } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThoughtCard />
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
