import { createStackNavigator } from "react-navigation";
import {
  CHECKUP_SUMMARY_SCREEN,
  HOW_YA_DOIN_SCREEN,
  PREDICT_THE_FUTURE_SCREEN,
} from "./screens";
import HowYaDoinScreen from "./HowYaDoinScreen";
import CheckUpSummaryScreen from "./CheckUpSummaryScreen";
import PredictTheFutureScreen from "./PredictTheFutureScreen";

export default createStackNavigator(
  {
    [HOW_YA_DOIN_SCREEN]: HowYaDoinScreen,
    [CHECKUP_SUMMARY_SCREEN]: CheckUpSummaryScreen,
    [PREDICT_THE_FUTURE_SCREEN]: PredictTheFutureScreen,
  },
  {
    initialRouteName: HOW_YA_DOIN_SCREEN,
  }
);
