import React from "react";
import theme from "./theme";
import { Dimensions, TextInput as ReactNativeTextInput } from "react-native";

export const textInputStyle = {
  height: Dimensions.get("screen").height * 0.15,
  backgroundColor: "gray",
  padding: 12,
  paddingTop: 14,
  borderRadius: 8,
  fontSize: 18,
  borderColor: theme.lightGray,
  borderWidth: 1,
  borderBottomWidth: 2,
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
