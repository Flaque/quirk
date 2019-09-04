import React from "react";
import theme from "../theme";
import { Container, HintHeader, SubHeader, ActionButton, Row } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, KeyboardAvoidingView, TextInput } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { CONDITION_SCREEN } from "./screens";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";

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
            <SubHeader>What are your goals for Quirk?</SubHeader>
            <HintHeader>
              This is just for you. We take your privacy extremely seriously.
              Your thoughts can never be read by a Quirk employee; your thoughts
              are only stored on this device.
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
