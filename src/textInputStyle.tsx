import React from "react";
import theme from "./theme";
import { Dimensions, TextInput as ReactNativeTextInput } from "react-native";

export const textInputStyle = {
  height: Dimensions.get("screen").height * 0.15,
  backgroundColor: "blue",
  padding: 18,
  paddingTop: 14,
  borderRadius: 10,
  fontSize: 26,
  borderColor: theme.darkBlue,
  borderWidth: 6,
  borderBottomWidth: 1,
  color: theme.darkText,
  textAlignVertical: "bottom",
};
export const textInputPlaceholderColor = theme.veryLightText;

export const TextInput = (props: {
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  onChangeText: (txt: string) => void;
  onBlur?: () => void;
  value: string;
}) => (
  <ReactNativeTextInput
    style={textInputStyle}
    placeholderTextColor={textInputPlaceholderColor}
    {...props}
  />
);
