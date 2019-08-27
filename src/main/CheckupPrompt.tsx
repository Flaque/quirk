import React from "react";
import { View } from "react-native";
import theme from "../theme";
import { SubHeader, HintHeader, GhostButtonWithGuts, B } from "../ui";
import { Feather } from "@expo/vector-icons";

export default ({ onPress }) => (
  <View
    style={{
      marginHorizontal: 24,
      marginVertical: 48,
    }}
  >
    <SubHeader>You've hit a milestone 👋</SubHeader>
    <HintHeader>
      See your progress over time and prepare for the next week.
    </HintHeader>
    <GhostButtonWithGuts
      style={{
        marginTop: 12,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <B
        style={{
          margin: 0,
          color: theme.blue,
          fontSize: 14,
        }}
      >
        Start Milestone
      </B>
      <Feather name="play" size={16} color={theme.blue} />
    </GhostButtonWithGuts>
  </View>
);
