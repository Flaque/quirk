import React from "react";
import {
  TouchableCardContainer,
  CardAttentionDot,
} from "../card/TouchableCard";
import shadowStyle from "../shadowStyle";
import { SubHeader, HintHeader } from "../ui";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../theme";

const ExerciseButton = ({
  title,
  hint,
  featherIconName,
  hasDot,
  onPress,
}: {
  title: string;
  hint: string;
  featherIconName: string;
  hasDot?: boolean;
  onPress: () => any;
}) => (
  <>
    {hasDot && <CardAttentionDot />}
    <TouchableCardContainer
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        ...shadowStyle,
      }}
      onPress={onPress}
    >
      <View
        style={{
          padding: 12,
          flex: 1,
        }}
      >
        <SubHeader
          style={{
            fontSize: 16,
          }}
        >
          {title}
        </SubHeader>
        <HintHeader
          style={{
            fontSize: 14,
            marginBottom: 0,
          }}
        >
          {hint}
        </HintHeader>
      </View>

      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
          width: 64,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name={featherIconName} color={theme.darkBlue} size={16} />
      </View>
    </TouchableCardContainer>
  </>
);

export default ExerciseButton;
