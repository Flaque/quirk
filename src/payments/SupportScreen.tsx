import React from "react";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";
import theme from "../theme";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { PAYMENT_SCREEN } from "../screens";
import { MediumHeader, HintHeader, ActionButton } from "../ui";
import { alias } from ".";

export default class SupportScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: "",
  };

  onFinish = async () => {
    if (this.state.email !== "" && this.state.email.includes("@")) {
      alias(this.state.email);
    }

    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.navigate(PAYMENT_SCREEN);
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 48,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
          }}
        >
          <StatusBar hidden={false} />
          <MediumHeader>Enter your email.</MediumHeader>
          <HintHeader>
            Once you're done, send an email to support and we'll fix your
            problem on our end.
          </HintHeader>

          <TextInput
            style={{
              ...textInputStyle,
              height: 48,
              marginBottom: 12,
            }}
            placeholderTextColor={textInputPlaceholderColor}
            placeholder={"ex: 'joe@example.org'"}
            value={this.state.email}
            onChangeText={email => {
              this.setState({ email });
            }}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
          />

          <ActionButton
            onPress={this.onFinish}
            title="Save & Return"
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
