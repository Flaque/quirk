import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  CBT_LIST_SCREEN,
  CBT_FORM_SCREEN,
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  PAYMENT_SCREEN,
} from "./src/screens";
import CBTListScreen from "./src/CBTListScreen";
import CBTFormScreen from "./src/form/FormScreen";
import ExplanationScreen from "./src/ExplanationScreen";
import SettingScreen from "./src/SettingsScreen";
import { CBTOnBoardingScreen } from "./src/CBTOnBoarding";
import withErrorBoundary from "./src/withErrorBoundary";
import PaymentScreen from "./src/PaymentScreen";

const App = createStackNavigator(
  {
    [PAYMENT_SCREEN]: PaymentScreen,
    [CBT_ON_BOARDING_SCREEN]: CBTOnBoardingScreen,
    [CBT_LIST_SCREEN]: CBTListScreen,
    [CBT_FORM_SCREEN]: CBTFormScreen,
    [EXPLANATION_SCREEN]: ExplanationScreen,
    [SETTING_SCREEN]: SettingScreen,
  },
  {
    initialRouteName: PAYMENT_SCREEN,
    mode: "modal",
  }
);

export default withErrorBoundary(createAppContainer(App));
