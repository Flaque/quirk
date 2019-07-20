import React from "react";
import {
  MediumHeader,
  HintHeader,
  Container,
  GhostButtonWithGuts,
  Paragraph,
  SubHeader,
  Row,
  GhostButton,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { SavedThought } from "../thoughts";
import { View } from "react-native";
import theme from "../theme";
import { THOUGHT_SCREEN } from "./screens";

export default class FinishedScreen extends React.Component<
  ScreenProps,
  {
    thought?: SavedThought;
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

  onNext() {
    this.props.navigation.push(THOUGHT_SCREEN);
  }

  render() {
    return (
      <Container
        style={{
          marginTop: Constants.statusBarHeight,
        }}
      >
        {this.state.thought && (
          <>
            <View
              style={{
                marginBottom: 18,
              }}
            >
              <MediumHeader>Summary of Thought</MediumHeader>
              <HintHeader>{this.state.thought.createdAt.toString()}</HintHeader>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>Your first thought</SubHeader>
              <GhostButtonWithGuts borderColor={theme.lightGray}>
                <Paragraph>{this.state.thought.automaticThought}</Paragraph>
              </GhostButtonWithGuts>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>How you challenged it</SubHeader>
              <GhostButtonWithGuts borderColor={theme.lightGray}>
                <Paragraph>{this.state.thought.challenge}</Paragraph>
              </GhostButtonWithGuts>
            </View>

            <View
              style={{
                marginBottom: 12,
              }}
            >
              <SubHeader>What you could think</SubHeader>
              <GhostButtonWithGuts borderColor={theme.lightGray}>
                <Paragraph>{this.state.thought.alternativeThought}</Paragraph>
              </GhostButtonWithGuts>
            </View>

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
