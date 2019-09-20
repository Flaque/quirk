import React from "react";
import theme from "../theme";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Paragraph, Badge, SubHeader, HintHeader } from "../ui";

export const TouchableCardContainer = ({
  onPress,
  children,
  style,
}: {
  onPress: () => any;
  children: any;
  style?: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "white",
      borderColor: theme.lightGray,
      borderBottomWidth: 2,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 18,
      flex: 1,
      ...style,
    }}
  >
    {children}
  </TouchableOpacity>
);

// The little gray header that can appear at the top of a card.
// ex: "THOUGHT      <message-icon>"
export const CardCrown = ({
  text,
  featherIconName,
  color,
}: {
  text: string;
  featherIconName: string;
  color?: string;
}) => (
  <View
    style={{
      paddingVertical: 8,
      paddingHorizontal: 12,
      width: "100%",
      backgroundColor: theme.lightOffwhite,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      justifyContent: "space-between",
      flex: 1,
      flexDirection: "row",
    }}
  >
    <Text
      style={{
        fontSize: 10,
        fontWeight: "700",
        color: theme.lightText,
        letterSpacing: 1,
      }}
    >
      {text}
    </Text>
    <Feather
      name={featherIconName}
      color={color || theme.veryLightText}
      size={12}
    />
  </View>
);

export const CardTitleAndSubtitleContent = ({ title, subtitle }) => (
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
      {subtitle}
    </HintHeader>
  </View>
);

export const CardTextContent = ({ text }: { text: string }) => (
  <Paragraph
    style={{
      color: theme.darkText,
      fontWeight: "400",
      fontSize: 16,
      marginBottom: 8,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,
      paddingBottom: 6,
    }}
  >
    {text}
  </Paragraph>
);

// Gray'd out border radius circle for accents and hints
export const CardMutedContent = ({ children }) => (
  <View
    style={{
      backgroundColor: theme.lightOffwhite,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 12,
      paddingTop: 6,
      margin: 4,
      borderRadius: 8,
      justifyContent: "center",
    }}
  >
    {children}
  </View>
);

export const CardBadge = ({
  text,
  featherIconName,
  backgroundColor,
}: {
  text: string;
  featherIconName: string;
  backgroundColor?: string;
}) => (
  <Badge
    featherIconName={featherIconName}
    text={text}
    backgroundColor={backgroundColor}
    style={{
      margin: 4,
    }}
  />
);

export const CardAttentionDot = () => (
  <View
    style={{
      backgroundColor: theme.pink,
      position: "relative",
      top: 12,
      right: -6,
      width: 18,
      height: 18,
      zIndex: 999,
      borderRadius: 18,
      alignSelf: "flex-end",
    }}
  />
);
