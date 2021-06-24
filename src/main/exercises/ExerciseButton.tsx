import React from "react";
import {
  TouchableCardContainer,
  CardAttentionDot,
  CardTitleAndSubtitleContent,
} from "../../card/TouchableCard";
import shadowStyle from "../../shadowStyle";
import { SubHeader, HintHeader } from "../../ui";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../theme";

const ExerciseButton = ({
  title,
  hint,
  featherIconName,
  hasYourAttention,
  onPress,
}: {
  title: string;
  hint: string;
  featherIconName: string;
  hasYourAttention?: boolean;
  onPress: () => any;
}) => (
  <>
    {hasYourAttention && <CardAttentionDot />}
    <TouchableCardContainer
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        borderColor: hasYourAttention ? theme.pink : theme.lightGray,
        borderRadius: 0,
        paddingLeft: 12,
        ...shadowStyle,
      }}
      onPress={onPress}
    >
      <CardTitleAndSubtitleContent title={title} subtitle={hint} />

      <View
        style={{
          backgroundColor: hasYourAttention
            ? theme.lightPink
            : theme.lightOffwhite,
          height: "100%",
          width: 64,
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 12,
        }}
      >
        <Feather
          name={featherIconName}
          color={hasYourAttention ? theme.darkPink : theme.darkBlue}
          size={16}
        />
      </View>
    </TouchableCardContainer>
  </>
);

export default ExerciseButton;
