import React from "react";
import theme from "../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  Row,
  GhostButton,
  Container,
} from "../ui";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { Thought } from "../thoughts";
import {
  ALTERNATIVE_SCREEN,
  DISTORTION_SCREEN,
  FINISHED_SCREEN,
} from "./screens";
import { TextInput, KeyboardAvoidingView } from "react-native";
import { saveThought } from "../thoughtstore";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";

export default class ChallengeScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
    isEditing: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined,
    isEditing: false,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      this.refreshFromNavigation(args);
    });

    this.props.navigation.addListener("didFocus", args => {
      this.refreshFromNavigation(args);
    });
  }

  refreshFromNavigation = args => {
    const thought = get(args, "state.params.thought");
    const isEditing = get(args, "state.params.isEditing", false);
    this.setState({
      thought,
      isEditing,
    });
  };

  onChange = (txt: string) => {
    this.setState(prevState => {
      if (!prevState.thought) {
        return prevState;
      }

      prevState.thought.challenge = txt;
      return prevState;
    });
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(ALTERNATIVE_SCREEN, {
      thought,
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

  render() {
    return (
      <Container
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
          }}
        >
          {this.state.thought && (
            <>
              <MediumHeader>{i18n.t("challenge")}</MediumHeader>
              <HintHeader>
                What could you be wrong about? Is there something you don't have
                enough evidence for?
              </HintHeader>

              <TextInput
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={i18n.t("cbt_form.changed_placeholder")}
                value={this.state.thought.challenge}
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChange}
                onBlur={() => stats.userFilledOutFormField("challenge")}
              />

              <Row
                style={{
                  marginTop: 24,
                  justifyContent: "flex-end",
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
                      title={"Back to Distortions"}
                      style={{
                        marginRight: 24,
                        flex: 1,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate(DISTORTION_SCREEN, {
                          thought: this.state.thought,
                        });
                      }}
                    />
                    <ActionButton
                      title={"Next"}
                      onPress={() => this.onNext()}
                    />
                  </>
                )}
              </Row>
            </>
          )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
