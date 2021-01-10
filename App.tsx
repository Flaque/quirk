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
import { INDEX_LEARN_SCREEN } from "./src/learn/screens";

if (Platform.OS === "android") {
  setCustomText({
    style: {
      fontFamily: "Roboto",
    },
  });
}

const App = createBottomTabNavigator(
  {
    MainScreen: { screen: MAIN_SCREEN },
    SettingScreen: { screen: SETTING_SCREEN },
    IndexLearnScreen: { screen: INDEX_LEARN_SCREEN },
    PaymentScreen: { screen: PAYMENT_SCREEN },
    LockScreen: { screen: LOCK_SCREEN },
    ExplanationScreen: { screen: EXPLANATION_SCREEN },
    OnboardingScreen: { screen: CBT_ON_BOARDING_SCREEN },
    CheckupScreen: { screen: CHECKUP_SCREEN },
    SupportScreen: { screen: SUPPORT_SCREEN },
    MarkdownArticleScreen: { screen: MARKDOWN_ARTICLE_SCREEN },
  },
  {
    initialRouteName: PAYMENT_SCREEN,
    tabBarComponent: (props) => {
      return <TabBar {...props} />;
    },
  }
);

export default withErrorBoundary(createAppContainer(App));
