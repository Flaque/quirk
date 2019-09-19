import React from "react";
import { ScrollView } from "react-native";
import { MediumHeader } from "../ui";
import ScreenProps from "../ScreenProps";
import theme from "../theme";
import Constants from "expo-constants";
import {
  TouchableCardContainer,
  CardCrown,
  CardTextContent,
} from "../card/TouchableCard";

export default class LearnScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          paddingHorizontal: 24,
          backgroundColor: theme.lightOffwhite,
        }}
      >
        <MediumHeader>To Read</MediumHeader>

        <TouchableCardContainer onPress={() => {}}>
          <CardCrown text="Article" featherIconName="book" />
          <CardTextContent text="Something" />
        </TouchableCardContainer>

        <TouchableCardContainer onPress={() => {}}>
          <CardCrown text="Article" featherIconName="book" />
          <CardTextContent text="Something" />
        </TouchableCardContainer>
      </ScrollView>
    );
  }
}
