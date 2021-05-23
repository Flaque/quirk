import React from "react";
import theme from "./theme";
import { Dimensions, TextInput as ReactNativeTextInput } from "react-native";

export const textInputStyle = {
  height: Dimensions.get("screen").height * 0.15,
  backgroundColor: "blue",
  padding: 15,
  paddingTop: 13,
  borderRadius: 10,
  fontSize: 12,
  borderColor: theme.lightGray,
  borderWidth: 3,
  borderBottomWidth:4,
  color: theme.darkText,
  textAlignVertical: "top",
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
