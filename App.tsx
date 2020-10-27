import { createAppContainer } from "react-navigation";
import {
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  PAYMENT_SCREEN,
  LOCK_SCREEN,
  MAIN_SCREEN,
  CHECKUP_SCREEN,
  SUPPORT_SCREEN,
  MARKDOWN_ARTICLE_SCREEN,
} from "./src/screens";
import SettingScreen from "./src/SettingsScreen";
import withErrorBoundary from "./src/sentry/withErrorBoundary";
import PaymentScreen from "./src/payments/PaymentScreen";
import LockScreen from "./src/lock/LockScreen";
import MainScreen from "./src/main";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBar from "./src/tabbar/TabBar";
import OnboardingScreen from "./src/onboarding";
import IndexLearnScreen from "./src/learn";
import CheckupScreen from "./src/checkups";
import { setCustomText } from "react-native-global-props";
import { Platform } from "react-native";
import SupportScreen from "./src/payments/SupportScreen";
import MarkdownArticleScreen from "./src/articles/MarkdownArticleScreen";

// Fixes a bug on OnePlus phones which have some buggy font by default
if (Platform.OS === "android") {
  setCustomText({
    style: {
      fontFamily: "Roboto",
    },
  });
}

const App = createBottomTabNavigator(
  {
    [MAIN_SCREEN]: MainScreen,
    [SETTING_SCREEN]: SettingScreen,
    [EXPLANATION_SCREEN]: IndexLearnScreen,
    [PAYMENT_SCREEN]: PaymentScreen,
    [LOCK_SCREEN]: LockScreen,
    [CBT_ON_BOARDING_SCREEN]: OnboardingScreen,
    [CHECKUP_SCREEN]: CheckupScreen,
    [SUPPORT_SCREEN]: SupportScreen,
    [MARKDOWN_ARTICLE_SCREEN]: MarkdownArticleScreen,
  },
  {
    initialRouteName: PAYMENT_SCREEN,
    tabBarComponent: props => {
      return <TabBar {...props} />;
    },
  }
);

export default withErrorBoundary(createAppContainer(App));
