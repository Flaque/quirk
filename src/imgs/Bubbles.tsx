import React from "react";
import { Paragraph, ThoughtDook } from "../ui";
import { View } from "react-native";
import theme from "../theme";

const PurpleBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require("../../assets/pink/Dook.png")}
  />
);

const YellowBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require("../../assets/yellow/Dook.png")}
  />
);

const PinkBubble = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require("../../assets/pink/Dook.png")}
  />
);

export const BubbleThought = ({
  children,
  color = "yellow",
  style,
}: {
  children: any;
  color?: "yellow" | "purple" | "pink";
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
        marginTop: 10,
        paddingRight: ,50
        ...style,
      }}
    >
      {bubbles[color]}
      <View
        style={{
          backgroundColor: theme.offwhite,
          borderRadius: 5,
          padding: 5,
            flex:1
        }}
      >
        <Paragraph>{children}</Paragraph>
      </View>
    </View>
  );
};
