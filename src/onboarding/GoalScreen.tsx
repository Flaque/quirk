import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  HintHeader,
  SubHeader,
  ActionButton,
  Row,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, KeyboardAvoidingView, TextInput } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { CONDITION_SCREEN } from "./screens";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import { initSegment } from "../stats";

const Segment = initSegment();

export default class GoalScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    goal: "",
  };

  onChange = async txt => {
    this.setState({
      goal: txt,
    });
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.push(CONDITION_SCREEN);
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
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            style={{
              paddingBottom: 24,
            }}
          >
            <MediumHeader>Welcome to Quirk! 👋</MediumHeader>
            <HintHeader
              style={{
                marginBottom: 24,
              }}
            >
              We'll get you started in a moment, but first we have some
              questions.
            </HintHeader>

            <SubHeader>What are your goals for Quirk?</SubHeader>
            <HintHeader>
              If you're not comfortable sharing, feel free to leave this blank.
            </HintHeader>

            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"ex: 'I want to stop having panic attacks'"}
              value={this.state.goal}
              multiline={true}
              numberOfLines={6}
              onChangeText={this.onChange}
            />

            <Row
              style={{
                marginTop: 24,
              }}
            >
              <ActionButton
                title={"Next"}
                width="100%"
                onPress={() => this.onNext()}
              />
            </Row>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
