import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  CBT_LIST_SCREEN,
  CBT_FORM_SCREEN,
  CBT_ON_BOARDING_SCREEN,
} from "./src/screens";
import CBTListScreen from "./src/CBTListScreen";
import CBTFormScreen from "./src/CBTFormScreen";
import CBTOnBoardingScreen from "./src/CBTOnBoardingScreen";

const App = createStackNavigator(
  {
    [CBT_LIST_SCREEN]: CBTListScreen,
    [CBT_FORM_SCREEN]: CBTFormScreen,
    [CBT_ON_BOARDING_SCREEN]: CBTOnBoardingScreen,
  },
  {
    initialRouteName: CBT_ON_BOARDING_SCREEN,
  }
);

export default createAppContainer(App);
