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

export default withErrorBoundary(createAppContainer(App));
