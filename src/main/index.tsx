import { createStackNavigator } from "react-navigation";
import ThoughtScreen from "./ThoughtScreen";
import {
  THOUGHT_SCREEN,
  DISTORTION_SCREEN,
  CHALLENGE_SCREEN,
  ALTERNATIVE_SCREEN,
  FINISHED_SCREEN,
  FEELING_SCREEN,
  FOLLOW_UP_SCREEN,
} from "./screens";
import ChallengeScreen from "./ChallengeScreen";
import DistortionScreen from "./DistortionScreen";
import AlternativeScreen from "./AlternativeScreen";
import FinishedScreen from "./FinishedScreen";
import FeelingScreen from "./FeelingScreen";
import FollowUpScreen from "./FollowUpScreen";

export default createStackNavigator(
  {
    [THOUGHT_SCREEN]: ThoughtScreen,
    [DISTORTION_SCREEN]: DistortionScreen,
    [CHALLENGE_SCREEN]: ChallengeScreen,
    [ALTERNATIVE_SCREEN]: AlternativeScreen,
    [FINISHED_SCREEN]: FinishedScreen,
    [FEELING_SCREEN]: FeelingScreen,
    [FOLLOW_UP_SCREEN]: FollowUpScreen,
  },
  {
    initialRouteName: THOUGHT_SCREEN,
  }
);
