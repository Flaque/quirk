import React from "react";
import { View } from "react-native";
import { Label, Row } from "../ui";
import theme from "../theme";

const FilledBlop = () => (
  <View
    style={{
      width: 24,
      height: 24,
      borderRadius: 8,
      backgroundColor: theme.blue,
      marginHorizontal: 4,
    }}
  />
);

const EmptyBlop = () => (
  <View
    style={{
      width: 24,
      height: 24,
      borderRadius: 8,
      backgroundColor: theme.lightGray,
      marginHorizontal: 4,
    }}
  />
);

export const ENOUGH_DAYS = 6;

export default ({ count }) => {
  const blops = [];
  for (let i = 0; i < count; i++) {
    blops.push(<FilledBlop key={`${i}-full`} />);
  }
  for (let i = 0; i < ENOUGH_DAYS - count; i++) {
    blops.push(<EmptyBlop key={`${i}-empty`} />);
  }

  return (
    <View
      style={{
        alignItems: "flex-start",
        margin: 32,
      }}
    >
      <Label marginBottom={18} textAlign={"left"}>
        Keep going, it takes about {ENOUGH_DAYS} days to build the healthy
        habit.
      </Label>

      <Row>{blops}</Row>
    </View>
  );
};
