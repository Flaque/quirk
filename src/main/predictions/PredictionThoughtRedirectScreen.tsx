import React from "react";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import theme from "../../theme";
import { ActionButton } from "../../ui";
import { ScrollView, StatusBar } from "react-native";
import { ASSUMPTION_SCREEN } from "../screens";

export default class PredictionThoughtRedirectScreen extends React.Component<
  ScreenProps
> {
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

        <ActionButton
          style={{
            marginTop: 12,
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
