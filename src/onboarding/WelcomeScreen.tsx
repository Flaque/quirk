import React from "react";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import theme from "../theme";
import { MediumHeader, Paragraph, ActionButton } from "../ui";
import { ScrollView, StatusBar } from "react-native";

export default class InfoOnboardingScreen extends React.Component<ScreenProps> {
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
          flex: 1,
        }}
      >
        <StatusBar hidden={false} />
        <MediumHeader>Welcome to Quirk!</MediumHeader>

        <Paragraph
          style={{
            fontSize: 18,
          }}
        >
          You should read this next part in full. Resist the urge to skip
          through. This is quite important and you only get one first
          impression.
        </Paragraph>

        <ActionButton
          style={{
            marginTop: 12,
            marginBottom: 48,
          }}
          width="100%"
          title="Continue"
          onPress={() => {
            this.props.navigation.navigate(ASSUMPTION_SCREEN);
          }}
        />
      </ScrollView>
    );
  }
}
