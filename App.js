import { createStackNavigator, createAppContainer } from "react-navigation";
import { CBT_LIST_SCREEN, CBT_FORM_SCREEN } from "./screens";
import CBTListScreen from "./CBTListScreen";
import CBTFormScreen from "./CBTFormScreen";

const App = createStackNavigator(
  {
    [CBT_LIST_SCREEN]: CBTListScreen,
    [CBT_FORM_SCREEN]: CBTFormScreen,
  },
  {
    initialRouteName: CBT_FORM_SCREEN,
  }
);

export default createAppContainer(App);
