import { createStackNavigator } from "react-navigation";
import { HOW_YA_DOIN_SCREEN } from "./screens";
import HowYaDoinScreen from "./HowYaDoinScreen";
export default createStackNavigator(
  {
    [HOW_YA_DOIN_SCREEN]: HowYaDoinScreen,
  },
  {
    initialRouteName: HOW_YA_DOIN_SCREEN,
  }
);
