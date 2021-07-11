import React from "react";
import theme from "../theme";
import { View } from "react-native";
import { GhostButtonWithGuts } from "../ui";
import ProgressBar from "./ProgressBar";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { newFadesIn, FadesIn } from "../animations";

export const TAB_BAR_HEIGHT = 76;

const TopBarContainer = ({
  children,
  style,
}: {
  children: any;
  style?: any;
}) => (
  <View
    style={{
      backgroundColor: "white",
      height: TAB_BAR_HEIGHT,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Constants.statusBarHeight,
      paddingHorizontal: 24,
      position: "relative",
      zIndex: 100,
      ...style,
    }}
  >
    {children}
  </View>
);

export const TitleTopBar = ({ onExit, shouldShowExitButton }) => (
  <TopBarContainer>
    {shouldShowExitButton && (
      <GhostButtonWithGuts
        style={{
          borderWidth: 0,
          borderBottomWidth: 0,
          textColor: theme.darkText,
          padding: 0,
          height: 32,
          width: 32,
          backgroundColor: theme.lightGray,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 24,
          borderRadius: 48,
        }}
        onPress={() => {
          onExit();
        }}
      >
        <Feather name="x" color={theme.blue} size={16} />
      </GhostButtonWithGuts>
    )}
  </TopBarContainer>
);

export default class ArticleTopBar extends React.Component<{
  onExit: () => any;
  pose: "visible" | "hidden";
  progress: number;
  shouldShowExitButton?: boolean;
}> {
  render() {
    const showExit = this.props.shouldShowExitButton ? true : false;
    return (
      <TopBarContainer>
        {showExit && (
          <GhostButtonWithGuts
            style={{
              borderWidth: 0,
              borderBottomWidth: 0,
              textColor: theme.darkText,
              padding: 0,
              height: 32,
              width: 32,
              backgroundColor: theme.lightGray,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 24,
              borderRadius: 48,
            }}
            onPress={() => {
              this.props.onExit();
            }}
          >
            <Feather name="x" color={theme.blue} size={16} />
          </GhostButtonWithGuts>
        )}
        <FadesIn
          pose={this.props.pose}
          style={{
            flex: 4,
          }}
        >
          <ProgressBar progress={this.props.progress} />
        </FadesIn>
      </TopBarContainer>
    );
  }
}
