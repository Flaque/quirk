import React from "react";
import {
  MediumHeader,
  HintHeader,
  Container,
  Row,
  ActionButton,
  GhostButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { Thought, newThought } from "../thoughts";
import { get } from "lodash";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import { TextInput, KeyboardAvoidingView, View } from "react-native";
import i18n from "../i18n";
import * as stats from "../stats";
import theme from "../theme";
import { FINISHED_SCREEN, DISTORTION_SCREEN, THOUGHT_SCREEN } from "./screens";
import { saveThought } from "../thoughtstore";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";

export default class AutomaticThoughtScreen extends React.Component<
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
      const thought = get(args, "state.params.thought", newThought());
      const isEditing = get(args, "state.params.isEditing", false);
      this.setState({
        thought,
        isEditing,
      });
    });
  }

  onChange = (txt: string) => {
    this.setState(prevState => {
      if (!prevState.thought) {
        return prevState;
      }

      prevState.thought.automaticThought = txt;
      return prevState;
    });
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    stats.thoughtRecorded();
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(DISTORTION_SCREEN, {
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
          paddingTop: Constants.statusBarHeight + 24,
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
              <Row>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <MediumHeader>{i18n.t("auto_thought")}</MediumHeader>
                  <HintHeader>What's going on?</HintHeader>
                </View>
              </Row>

              <TextInput
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
                value={
                  this.state.thought ? this.state.thought.automaticThought : ""
                }
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChange}
                onBlur={() => stats.userFilledOutFormField("automatic")}
              />

              <Row
                style={{
                  marginTop: 24,
                  justifyContent: "flex-end",
                }}
              >
                {this.state.isEditing ? (
                  <ActionButton
                    title={"Finished"}
                    onPress={() => {
                      this.onFinish();
                    }}
                    style={{
                      flex: 1,
                    }}
                  />
                ) : (
                  <>
                    <GhostButton
                      title="Cancel"
                      onPress={() => {
                        this.props.navigation.navigate(THOUGHT_SCREEN);
                      }}
                      style={{
                        marginRight: 12,
                      }}
                    />
                    <ActionButton
                      title={"Next"}
                      onPress={() => this.onNext()}
                      style={{
                        flex: 1,
                      }}
                      disabled={!this.state.thought.automaticThought}
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
