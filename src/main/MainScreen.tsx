import React from "react";
import ScreenProps from "../ScreenProps";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import theme from "../theme";
import { getExercises } from "../thoughtstore";
import { SavedThought, ThoughtGroup, groupThoughtsByDay } from "../thoughts";
import { validThoughtGroup } from "../sanitize";
import { MediumHeader, HintHeader } from "../ui";
import parseThoughts from "./parseThoughts";
import { newPopsUp, newFadesIn } from "../animations";
import ThoughtList from "./ThoughtList";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import { TextInput } from "react-native-gesture-handler";
import { textInputStyle } from "./textInputStyle";
import { textInputPlaceholderColor } from "../form/textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";

const CardPopsUp = newPopsUp({
  fullHeight: Dimensions.get("screen").height * 0.8,
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
      <>
        <BackgroundOverlay
          isVisible={view === "peak"}
          onPress={() => {
            Keyboard.dismiss();
            this.setState({
              view: "hidden",
            });
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ view: "peak" });
          }}
        >
          <CardPopsUp
            style={{
              position: "absolute",
              width: "100%",
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
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
              value={"hey"}
              multiline={true}
              numberOfLines={6}
              onChangeText={() => {}}
              onFocus={() => {
                this.setState({
                  view: "peak",
                });
              }}
              onBlur={() => stats.userFilledOutFormField("automatic")}
            />
          </CardPopsUp>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const MaxFadeIn = newFadesIn({
  maxOpacity: 0.3,
});

const BackgroundOverlay = ({ isVisible, onPress }) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    style={{
      height: Dimensions.get("screen").height,
      width: Dimensions.get("screen").width,
    }}
  >
    <MaxFadeIn
      style={{
        position: "absolute",
        zIndex: 2,
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: theme.veryLightText,
      }}
      pose={isVisible ? "visible" : "hidden"}
    />
  </TouchableWithoutFeedback>
);

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
