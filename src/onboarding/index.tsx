import { createStackNavigator } from "react-navigation-stack";
import GoalScreen from "./GoalScreen";
import {
  CONDITION_SCREEN,
  GOAL_SCREEN,
  FAMILIARITY_SCREEN,
  NOTIFICATION_SCREEN,
  CHECKUP_PROMPT_SCREEN,
  WELCOME_SCREEN,
  ANXIETY_CHECK_SCREEN,
  PREDICTION_PROMPT_SCREEN,
} from "./screens";
import ConditionScreen from "./ConditionScreen";
import FamiliarityScreen from "./FamiliarityScreen";
import NotificationScreen from "./NotificationScreen";
import CheckupPromptScreen from "./CheckupPromptScreen";
import WelcomeScreen from "./WelcomeScreen";
import AnxietyCheckScreen from "./AnxietyCheckScreen";
import PredictionPromptScreen from "./PredictionPromptScreen";

export default createStackNavigator(
  {
    [GOAL_SCREEN]: GoalScreen,
    [CONDITION_SCREEN]: ConditionScreen,
    [FAMILIARITY_SCREEN]: FamiliarityScreen,
    [NOTIFICATION_SCREEN]: NotificationScreen,
    [CHECKUP_PROMPT_SCREEN]: CheckupPromptScreen,
    [WELCOME_SCREEN]: WelcomeScreen,
    [ANXIETY_CHECK_SCREEN]: AnxietyCheckScreen,
    [PREDICTION_PROMPT_SCREEN]: PredictionPromptScreen,
  },
  {
    initialRouteName: WELCOME_SCREEN,
  }
);
