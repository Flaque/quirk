import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  CBT_LIST_SCREEN,
  CBT_FORM_SCREEN,
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  PAYMENT_SCREEN,
  CBT_VIEW_SCREEN,
  LOCK_SCREEN,
  MAIN_SCREEN,
} from "./src/screens";
import ExplanationScreen from "./src/ExplanationScreen";
import SettingScreen from "./src/SettingsScreen";
import withErrorBoundary from "./src/sentry/withErrorBoundary";
import PaymentScreen from "./src/payments/PaymentScreen";
import LockScreen from "./src/lock/LockScreen";
import MainScreen from "./src/main";
import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import TabBar from "./src/tabbar/TabBar";

// const App = createStackNavigator(
// {
//   [PAYMENT_SCREEN]: PaymentScreen,
//   [CBT_ON_BOARDING_SCREEN]: OnboardingScreen,
//   [CBT_LIST_SCREEN]: CBTListScreen,
//   [CBT_FORM_SCREEN]: CBTFormScreen,
//   [EXPLANATION_SCREEN]: ExplanationScreen,
//   [SETTING_SCREEN]: SettingScreen,
//   [CBT_VIEW_SCREEN]: FinishedThoughtScreen,
//   [LOCK_SCREEN]: LockScreen,
//   [MAIN_SCREEN]: MainScreen,
// },
//   {
//     initialRouteName: MAIN_SCREEN,
//     mode: "modal",
//   }
// );

const App = createBottomTabNavigator(
  {
    [MAIN_SCREEN]: MainScreen,
    [SETTING_SCREEN]: SettingScreen,
    [EXPLANATION_SCREEN]: ExplanationScreen,
    [PAYMENT_SCREEN]: PaymentScreen,
    [LOCK_SCREEN]: LockScreen,
  },
  {
    initialRouteName: PAYMENT_SCREEN,
    tabBarComponent: props => {
      return <TabBar {...props} />;
    },
  }
);

export default withErrorBoundary(createAppContainer(App));
