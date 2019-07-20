import React from "react";
import { View } from "react-native";
import theme from "../theme";
import { ActionButton } from "../ui";
import ScreenProps from "../ScreenProps";
import { MAIN_SCREEN, SETTING_SCREEN, EXPLANATION_SCREEN } from "../screens";
import haptic from "../haptic";
import { Haptic } from "expo";

export const TAB_BAR_HEIGHT = 76;

export default ({ navigation }: ScreenProps) => {
  const index = navigation.state.index;
  const tab = navigation.state.routes[index].key;

  return (
    <View
      style={{
        backgroundColor: "white",
        height: TAB_BAR_HEIGHT,
        borderTopColor: theme.lightGray,
        borderTopWidth: 1,
        paddingBottom: 24,
        paddingHorizontal: 12,
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
        style={{ marginHorizontal: 4, padding: 0 }}
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
        style={{ marginHorizontal: 4, padding: 0 }}
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
        style={{ marginHorizontal: 4, padding: 0 }}
        onPress={() => {
          haptic.impact(Haptic.ImpactFeedbackStyle.Light);
          navigation.navigate(EXPLANATION_SCREEN);
        }}
      />
    </View>
  );
};
