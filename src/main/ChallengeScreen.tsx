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
import { textInputStyle } from "./textInputStyle";
import { textInputPlaceholderColor } from "../form/textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { Thought } from "../thoughts";
import { ALTERNATIVE_SCREEN } from "./screens";
import { TextInput } from "react-native";

export default class ChallengeScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
      });
    });
  }

  onChange = (txt: string) => {
    this.setState(prevState => {
      if (!prevState.thought) {
        return prevState;
      }

      prevState.thought.challenge = txt;
      return prevState;
    });
  };

  onNext = () => {
    this.props.navigation.push(ALTERNATIVE_SCREEN, {
      thought: this.state.thought,
    });
  };

  render() {
    return (
      <Container
        style={{
          marginTop: Constants.statusBarHeight,
        }}
      >
        {this.state.thought && (
          <>
            <MediumHeader>Challenge your thought</MediumHeader>
            <HintHeader>
              In your own words, write out what about your thought is distorted.
            </HintHeader>

            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
              value={this.state.thought.challenge}
              multiline={true}
              numberOfLines={6}
              autoFocus={true}
              onChangeText={this.onChange}
              onBlur={() => stats.userFilledOutFormField("challenge")}
            />

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                borderColor={theme.lightGray}
                textColor={theme.veryLightText}
                title={"Learn More"}
                style={{
                  marginRight: 24,
                  flex: 1,
                }}
              />
              <ActionButton title={"Next"} onPress={() => this.onNext()} />
            </Row>
          </>
        )}
      </Container>
    );
  }
}
