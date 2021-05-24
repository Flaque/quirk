import React from "react";
import {
  MediumHeader,
  HintHeader,
  Container,
  Row,
  GhostButton,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { Thought } from "../thoughts";
import { get } from "lodash";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import { TextInput, KeyboardAvoidingView } from "react-native";
import i18n from "../i18n";
import * as stats from "../stats";
import theme from "../theme";
import { CHALLENGE_SCREEN, FEELING_SCREEN, FINISHED_SCREEN } from "./screens";
import { saveThought } from "../thoughtstore";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";

export default class AlternativeScreen extends React.Component<
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
      const thought = get(args, "state.params.thought");
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

      prevState.thought.alternativeThought = txt;
      return prevState;
    });
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(FEELING_SCREEN, {
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
              <MediumHeader>{i18n.t("alt_thought")}</MediumHeader>
              <HintHeader>
                Given this situation again, what could you think instead?
              </HintHeader>

              <TextInput
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
                value={this.state.thought.alternativeThought}
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChange}
                onBlur={() => stats.userFilledOutFormField("alternative")}
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
                      title={"Back"}
                      style={{
                        marginRight: 24,
                        flex: 1,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate(CHALLENGE_SCREEN, {
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
