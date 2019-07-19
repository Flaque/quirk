import { createStackNavigator } from "react-navigation";
import ThoughtScreen from "./ThoughtScreen";
import {
  THOUGHT_SCREEN,
  DISTORTION_SCREEN,
  CHALLENGE_SCREEN,
  ALTERNATIVE_SCREEN,
} from "./screens";
import ChallengeScreen from "./ChallengeScreen";
import DistortionScreen from "./DistortionScreen";
import AlternativeScreen from "./AlternativeScreen";

export default createStackNavigator(
  {
    [THOUGHT_SCREEN]: ThoughtScreen,
    [DISTORTION_SCREEN]: DistortionScreen,
    [CHALLENGE_SCREEN]: ChallengeScreen,
    [ALTERNATIVE_SCREEN]: AlternativeScreen,
  },
  {
    initialRouteName: THOUGHT_SCREEN,
  }
);
