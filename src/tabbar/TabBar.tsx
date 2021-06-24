import React from "react";
import { View, Keyboard } from "react-native";
import theme from "../theme";
import { ActionButton } from "../ui";
import ScreenProps from "../ScreenProps";
import {
  MAIN_SCREEN,
  SETTING_SCREEN,
  EXPLANATION_SCREEN,
  PAYMENT_SCREEN,
  LOCK_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  CHECKUP_SCREEN,
  SUPPORT_SCREEN,
} from "../screens";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { Platform } from "@unimodules/core";
import { MARKDOWN_ARTICLE_SCREEN } from "../screens";

export const TAB_BAR_HEIGHT = 76;

export default class extends React.Component<ScreenProps> {
  private keyboardDidShowListener;
  private keyboardDidHideListener;

  state = {
    hidden: false,
  };

  _keyboardDidShow = () => {
    if (Platform.OS === "android") {
      this.setState({
        hidden: true,
      });
    }
  };

  _keyboardDidHide = () => {
    if (Platform.OS === "android") {
      this.setState({
        hidden: false,
      });
    }
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { navigation } = this.props;

    const index = navigation.state.index;
    const tab = navigation.state.routes[index].key;

    // Hide the tab bar in the payment, lock screen, onboarding, and support screens
    if (
      tab === PAYMENT_SCREEN ||
      tab === LOCK_SCREEN ||
      tab === CBT_ON_BOARDING_SCREEN ||
      tab === CHECKUP_SCREEN ||
      tab === SUPPORT_SCREEN ||
      tab === MARKDOWN_ARTICLE_SCREEN
    ) {
      return null;
    }

    // Hide if we're just hidden from the keyboard
    if (this.state.hidden) {
      return null;
    }

    return (
      <View
        style={{
          backgroundColor: "white",
          height: TAB_BAR_HEIGHT,
          borderTopColor: theme.lightGray,
          borderTopWidth: 1,
          paddingBottom: 24,

          paddingTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 100,
          position: "relative",
        }}
      >
        <ActionButton
          title="Settings"
          width={100}
          fillColor={tab === SETTING_SCREEN ? theme.lightBlue : "white"}
          textColor={
            tab === SETTING_SCREEN ? theme.darkBlue : theme.veryLightText
          }
          style={{
            marginHorizontal: 4,
            padding: 0,
            borderWidth: 0,
            borderBottomWidth: 0,
          }}
          onPress={() => {
            haptic.impact(Haptic.ImpactFeedbackStyle.Light);
            navigation.navigate(SETTING_SCREEN);
          }}
        />
        <ActionButton
          title="Thoughts"
          width={100}
          fillColor={tab === MAIN_SCREEN ? theme.lightBlue : "white"}
          textColor={tab === MAIN_SCREEN ? theme.darkBlue : theme.veryLightText}
          style={{
            marginHorizontal: 4,
            padding: 0,
            borderWidth: 0,
            borderBottomWidth: 0,
          }}
          onPress={() => {
            haptic.impact(Haptic.ImpactFeedbackStyle.Light);
            navigation.navigate(MAIN_SCREEN);
          }}
        />
        <ActionButton
          title="Learn"
          width={100}
          fillColor={tab === EXPLANATION_SCREEN ? theme.lightBlue : "white"}
          textColor={
            tab === EXPLANATION_SCREEN ? theme.darkBlue : theme.veryLightText
          }
          style={{
            marginHorizontal: 4,
            padding: 0,
            borderWidth: 0,
            borderBottomWidth: 0,
          }}
          onPress={() => {
            haptic.impact(Haptic.ImpactFeedbackStyle.Light);
            navigation.navigate(EXPLANATION_SCREEN);
          }}
        />
      </View>
    );
  }
}
