import { createStackNavigator } from "react-navigation";
import { INDEX_LEARN_SCREEN, DISTORTION_LEARN_SCREEN } from "./screens";
import DistortionLearnScreen from "./DistortionLearnScreen";
import IndexLearnScreen from "./IndexLearnScreen";

export default createStackNavigator(
  {
    [DISTORTION_LEARN_SCREEN]: DistortionLearnScreen,
    [INDEX_LEARN_SCREEN]: IndexLearnScreen,
  },
  {
    initialRouteName: INDEX_LEARN_SCREEN,
  }
);
