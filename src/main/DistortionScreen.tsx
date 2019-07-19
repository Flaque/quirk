import React from "react";
import ScreenProps from "../ScreenProps";
import { get } from "lodash";
import {
  MediumHeader,
  HintHeader,
  Container,
  RoundedSelector,
  GhostButtonWithGuts,
  SubHeader,
} from "../ui";
import Constants from "expo-constants";
import { CognitiveDistortion } from "../distortions";
import theme from "../theme";
import { Text, ScrollView, View } from "react-native";
import { FadesIn } from "../animations";
import { Thought } from "../thoughts";
import * as stats from "../stats";
import haptic from "../haptic";

export default class DistortionScreen extends React.Component<
  ScreenProps,
  {
    thought: Thought;
    shouldShowPreviousThought: boolean;
    shouldShowDistortions: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined, // being explicit that we have to load this
    shouldShowPreviousThought: false,
    shouldShowDistortions: false,
  };

  constructor(props) {
    super(props);
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought", "🤷‍");
      this.setState({
        thought,
      });

      // This is a bit of a hack to trigger the fade in for the thought.
      setTimeout(async () => {
        await this.setState({
          shouldShowPreviousThought: true,
        });
      }, 50);
    });
  }

  componentDidMount() {
    // We fade this in slightly AFTER the thought, so the user
    // sees them as seperate entities.
    setTimeout(() => {
      this.setState({
        shouldShowDistortions: true,
      });
    }, 700);
  }

  onPressSlug = async selected => {
    this.setState(prevState => {
      const { cognitiveDistortions } = prevState.thought;
      const index = cognitiveDistortions.findIndex(
        ({ slug }) => slug === selected
      );

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;

      prevState.thought.cognitiveDistortions = cognitiveDistortions;
      return prevState;
    });

    haptic.selection();
    stats.userFilledOutFormField("distortions");
    stats.userCheckedDistortion(selected);
  };

  render() {
    return (
      <ScrollView>
        <Container
          style={{
            marginTop: Constants.statusBarHeight,
          }}
        >
          {this.state.thought && (
            <>
              <FadesIn
                pose={
                  this.state.shouldShowPreviousThought ? "visible" : "hidden"
                }
                style={{
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    marginBottom: 18,
                  }}
                >
                  <MediumHeader>Cognitive Distortions</MediumHeader>
                  <HintHeader>Is this thought logical?</HintHeader>
                </View>
                <SubHeader>Your Thought</SubHeader>
                <GhostButtonWithGuts
                  borderColor={theme.lightGray}
                  onPress={() => {}}
                >
                  <Text>{this.state.thought.automaticThought}</Text>
                </GhostButtonWithGuts>
              </FadesIn>

              <FadesIn
                pose={this.state.shouldShowDistortions ? "visible" : "hidden"}
              >
                <SubHeader>Common Distortions</SubHeader>
                <HintHeader>
                  Tap any of these that apply to your current situation.
                </HintHeader>
                <RoundedSelector
                  items={this.state.thought.cognitiveDistortions}
                  onPress={() => {}}
                />
              </FadesIn>
            </>
          )}
        </Container>
      </ScrollView>
    );
  }
}
