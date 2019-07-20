import React from "react";
import { Image, View } from "react-native";
import { Label } from "../ui";

export default () => (
  <View
    style={{
      alignItems: "center",
      margin: 18,
    }}
  >
    <Image
      source={require("../../assets/looker/Looker.png")}
      style={{
        width: 200,
        height: 150,
        alignSelf: "center",
        marginBottom: 32,
      }}
    />
    <Label marginBottom={18} textAlign={"center"}>
      Keep going, it takes about 8 thoughts to build the habit.
    </Label>
  </View>
);
