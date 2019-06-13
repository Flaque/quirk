import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  CBT_LIST_SCREEN,
  CBT_FORM_SCREEN,
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
  CBT_ON_BOARDING_SCREEN,
} from "./src/screens";
import CBTListScreen from "./src/CBTListScreen";
import CBTFormScreen from "./src/CBTFormScreen";
import ExplanationScreen from "./src/ExplanationScreen";
import SettingScreen from "./src/setting";
import { CBTOnBoardingScreen } from "./src/CBTOnBoarding";
import withErrorBoundary from "./src/withErrorBoundary";
import Midgar from "midgar-js";

const midgar = new Midgar().init(""); // TODO put in api key again

const App = createStackNavigator(
  {
    [CBT_ON_BOARDING_SCREEN]: CBTOnBoardingScreen,
    [CBT_LIST_SCREEN]: CBTListScreen,
    [CBT_FORM_SCREEN]: CBTFormScreen,
    [EXPLANATION_SCREEN]: ExplanationScreen,
    [SETTING_SCREEN]: SettingScreen,
  },
  {
    initialRouteName: CBT_FORM_SCREEN,
    mode: "modal",
  }
);

const AppContainer = createAppContainer(App);

export default withErrorBoundary(() => (
  <AppContainer
    onNavigationStateChange={(prevState, currentState) => {
      midgar.trackScreen(prevState, currentState);
    }}
  />
));
