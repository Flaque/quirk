import React from "react";
import { View } from "react-native";
import theme from "../../theme";
import { SubHeader, HintHeader, GhostButtonWithGuts, B } from "../../ui";
import { Feather } from "@expo/vector-icons";

export default ({ onPressYes, onPressNo }) => (
  <View
    style={{
      marginHorizontal: 24,
      marginVertical: 48,
    }}
  >
    <SubHeader>We'd love your feedback! 🙏</SubHeader>
    <HintHeader>Answer 4 questions to make Quirk better.</HintHeader>
    <GhostButtonWithGuts
      style={{
        marginTop: 12,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPressYes}
    >
      <B
        style={{
          margin: 0,
          color: theme.blue,
          fontSize: 14,
        }}
      >
        Give feedback
      </B>
      <Feather name="play" size={16} color={theme.blue} />
    </GhostButtonWithGuts>

    <GhostButtonWithGuts
      style={{
        marginTop: 6,
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPressNo}
    >
      <B
        style={{
          margin: 0,
          color: theme.lightText,
          fontSize: 14,
        }}
      >
        No Thanks
      </B>
    </GhostButtonWithGuts>
  </View>
);
