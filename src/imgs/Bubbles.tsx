import React from "react";
import { Paragraph, ThoughtDook } from "../ui";
import { View } from "react-native";
import theme from "../theme";

const PurpleBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 8, width: 40, height: 40 }}
    source={require("../../assets/pink/Dook.png")}
  />
);

const YellowBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 8, width: 40, height: 40}}
    source={require("../../assets/yellow/Dook.png")}
  />
);

const PinkBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 8, width: 40, height: 40 }}
    source={require("../../assets/pink/Dook.png")}
  />
);

export const BubbleThought = ({
  children,
  color = "#4cbdac",
  style,
}: {
  children: any;
  color?: "#4cbdac" | "red" | "pink";
  style?: any;
}) => {
  const bubbles = {
    purple: <PurpleBubble />,
    yellow: <YellowBubble />,
    pink: <PinkBubble />,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 12,
        paddingRight: 48,
        ...style,
      }}
    >
      {bubbles[color]}
      <View
        style={{
          backgroundColor: theme.lightGray,
          borderRadius: 25,
          padding: 10,
        }}
      >
        <Paragraph>{children}</Paragraph>
      </View>
    </View>
  );
};
