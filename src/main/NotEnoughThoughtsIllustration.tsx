import React from "react";
import { View } from "react-native";
import { Label } from "../ui";
import theme from "../theme";

export default () => {
  return (
    <View
      style={{
        alignItems: "center",
        margin: 18,
      }}
    >
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          borderColor: theme.lightGray,
          borderBottomWidth: 2,
          borderRadius: 8,
          borderWidth: 1,
          marginBottom: 18,
          flex: 1,
          minWidth: "100%",
          minHeight: 96,
        }}
      />

      <Label marginBottom={18} textAlign={"center"}>
        Keep going, it takes about 8 thoughts to build the habit.
      </Label>
    </View>
  );
};
