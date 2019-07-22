import theme from "../theme";
import { Dimensions } from "react-native";

export const textInputStyle = {
  height: Dimensions.get("screen").height * 0.15,
  backgroundColor: "white",
  padding: 12,
  paddingTop: 14,
  borderRadius: 8,
  fontSize: 16,
  borderColor: theme.lightGray,
  borderWidth: 1,
  borderBottomWidth: 2,
  color: theme.darkText,
  textAlignVertical: "top",
};
export const textInputPlaceholderColor = theme.veryLightText;
