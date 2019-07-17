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
import CBTListScreen from "./src/list/CBTListScreen";
import CBTFormScreen from "./src/form/FormScreen";
import FinishedThoughtScreen from "./src/form/FinishedThoughtScreen";
import ExplanationScreen from "./src/ExplanationScreen";
import SettingScreen from "./src/SettingsScreen";
import OnboardingScreen from "./src/onboarding/OnboardingScreen";
import withErrorBoundary from "./src/sentry/withErrorBoundary";
import PaymentScreen from "./src/payments/PaymentScreen";
import LockScreen from "./src/lock/LockScreen";
import MainScreen from "./src/main/MainScreen";

const App = createStackNavigator(
  {
    [PAYMENT_SCREEN]: PaymentScreen,
    [CBT_ON_BOARDING_SCREEN]: OnboardingScreen,
    [CBT_LIST_SCREEN]: CBTListScreen,
    [CBT_FORM_SCREEN]: CBTFormScreen,
    [EXPLANATION_SCREEN]: ExplanationScreen,
    [SETTING_SCREEN]: SettingScreen,
    [CBT_VIEW_SCREEN]: FinishedThoughtScreen,
    [LOCK_SCREEN]: LockScreen,
    [MAIN_SCREEN]: MainScreen,
  },
  {
    initialRouteName: MAIN_SCREEN,
    mode: "modal",
  }
);

export default withErrorBoundary(createAppContainer(App));
