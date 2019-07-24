import { createAppContainer } from "react-navigation";
import {
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  PAYMENT_SCREEN,
  LOCK_SCREEN,
  MAIN_SCREEN,
} from "./src/screens";
import SettingScreen from "./src/SettingsScreen";
import withErrorBoundary from "./src/sentry/withErrorBoundary";
import PaymentScreen from "./src/payments/PaymentScreen";
import LockScreen from "./src/lock/LockScreen";
import MainScreen from "./src/main";
import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import TabBar from "./src/tabbar/TabBar";
import OnboardingScreen from "./src/onboarding/OnboardingScreen";
import IndexLearnScreen from "./src/learn";

const App = createBottomTabNavigator(
  {
    [MAIN_SCREEN]: MainScreen,
    [SETTING_SCREEN]: SettingScreen,
    [EXPLANATION_SCREEN]: IndexLearnScreen,
    [PAYMENT_SCREEN]: PaymentScreen,
    [LOCK_SCREEN]: LockScreen,
    [CBT_ON_BOARDING_SCREEN]: OnboardingScreen,
  },
  {
    initialRouteName: PAYMENT_SCREEN,
    tabBarComponent: props => {
      return <TabBar {...props} />;
    },
  }
);

export default withErrorBoundary(createAppContainer(App));
