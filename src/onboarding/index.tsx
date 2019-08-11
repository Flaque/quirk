import { createStackNavigator } from "react-navigation";
import GoalScreen from "./GoalScreen";
import {
  CONDITION_SCREEN,
  GOAL_SCREEN,
  FAMILIARITY_SCREEN,
  NOTIFICATION_SCREEN,
} from "./screens";
import ConditionScreen from "./ConditionScreen";
import FamiliarityScreen from "./FamiliarityScreen";
import NotificationScreen from "./NotificationScreen";

export default createStackNavigator(
  {
    [GOAL_SCREEN]: GoalScreen,
    [CONDITION_SCREEN]: ConditionScreen,
    [FAMILIARITY_SCREEN]: FamiliarityScreen,
    [NOTIFICATION_SCREEN]: NotificationScreen,
  },
  {
    initialRouteName: GOAL_SCREEN,
  }
);
