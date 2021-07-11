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
  ActionButton,
  GhostButton,
} from "../ui";
import Constants from "expo-constants";
import theme from "../theme";
import { Text, ScrollView, View } from "react-native";
import { Thought } from "../thoughts";
import * as stats from "../stats";
import haptic from "../haptic";
import {
  CHALLENGE_SCREEN,
  FINISHED_SCREEN,
  AUTOMATIC_THOUGHT_SCREEN,
} from "./screens";
import { saveThought } from "../thoughtstore";
import i18n from "../i18n";
import * as Haptic from "expo-haptics";

export default class DistortionScreen extends React.Component<
  ScreenProps,
  {
    thought: Thought;
    shouldShowPreviousThought: boolean;
    shouldShowDistortions: boolean;
    isEditing: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined, // being explicit that we have to load this
    shouldShowPreviousThought: false,
    shouldShowDistortions: false,
    isEditing: false,
  };

  constructor(props) {
    super(props);
    this.props.navigation.addListener("willFocus", args => {
      this.refreshFromNavigation(args);
    });

    this.props.navigation.addListener("didFocus", args => {
      this.refreshFromNavigation(args);
    });
  }

  refreshFromNavigation = args => {
    const thought = get(args, "state.params.thought", "🤷‍");
    const isEditing = get(args, "state.params.isEditing", false);
    this.setState({
      thought,
      isEditing,
    });
  };

  // From editing
  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(FINISHED_SCREEN, {
      thought,
    });
  };

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

  onBackToThought = async () => {
    const thought = await saveThought(this.state.thought);
    this.props.navigation.navigate(AUTOMATIC_THOUGHT_SCREEN, {
      thought: thought,
    });
  };

  onNext = async () => {
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(CHALLENGE_SCREEN, {
      thought,
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <ScrollView
          style={{
            backgroundColor: theme.lightOffwhite,
            marginTop: Constants.statusBarHeight + 24,
          }}
        >
          <Container
            style={{
              backgroundColor: theme.lightOffwhite,
            }}
          >
            {this.state.thought && (
              <>
                <View
                  style={{
                    marginBottom: 18,
                  }}
                >
                  <MediumHeader>
                    {i18n.t("cbt_form.cog_distortion")}
                  </MediumHeader>
                  <HintHeader>Is this thought logical?</HintHeader>
                </View>

                <View
                  style={{
                    marginBottom: 12,
                  }}
                >
                  <SubHeader>Your Thought</SubHeader>
                  <GhostButtonWithGuts
                    borderColor={theme.lightGray}
                    onPress={() => this.onBackToThought()}
                  >
                    <Text>{this.state.thought.automaticThought}</Text>
                  </GhostButtonWithGuts>
                </View>

                <SubHeader>Common Distortions</SubHeader>
                <HintHeader>
                  Tap any of these that apply to your current situation.
                </HintHeader>
                <RoundedSelector
                  items={this.state.thought.cognitiveDistortions}
                  onPress={this.onPressSlug}
                />
              </>
            )}
          </Container>
        </ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: 12,
            borderTopWidth: 1,
            borderTopColor: theme.lightGray,
            justifyContent: "flex-end",
            flexDirection: "row",
            shadowColor: theme.gray,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 10,
            shadowOpacity: 0.8,
          }}
        >
          {this.state.isEditing ? (
            <ActionButton
              title={"Save"}
              onPress={() => this.onFinish()}
              width={"100%"}
            />
          ) : (
            <>
              <GhostButton
                borderColor={theme.lightGray}
                textColor={theme.veryLightText}
                title={"Back"}
                style={{
                  marginRight: 24,
                  flex: 1,
                }}
                onPress={() => {
                  this.props.navigation.navigate(AUTOMATIC_THOUGHT_SCREEN, {
                    thought: this.state.thought,
                  });
                }}
              />
              <ActionButton title={"Next"} onPress={() => this.onNext()} />
            </>
          )}
        </View>
      </View>
    );
  }
}
