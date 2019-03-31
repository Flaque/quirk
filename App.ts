import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  CBT_LIST_SCREEN,
  CBT_FORM_SCREEN,
  EXPLANATION_SCREEN,
  SETTING_SCREEN,
} from "./src/screens";
import CBTListScreen from "./src/CBTListScreen";
import CBTFormScreen from "./src/CBTFormScreen";
import ExplanationScreen from "./src/ExplanationScreen";
import SettingScreen from "./src/setting";

const App = createStackNavigator(
  {
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

export default createAppContainer(App);
