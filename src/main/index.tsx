import { createStackNavigator } from "react-navigation-stack";
import ThoughtScreen from "./ThoughtScreen";
import {
  THOUGHT_SCREEN,
  DISTORTION_SCREEN,
  CHALLENGE_SCREEN,
  ALTERNATIVE_SCREEN,
  FINISHED_SCREEN,
  FEELING_SCREEN,
  FOLLOW_UP_REQUEST_SCREEN,
  FOLLOW_UP_FEELING_SCREEN,
  FOLLOW_UP_FEELING_REVIEW_SCREEN,
  FOLLOW_UP_NOTE_SCREEN,
  FEEDBACK_SCREEN,
  FEEDBACK_LEAVE_REVIEW,
  CHECKUP_SUMMARY_SCREEN,
  ASSUMPTION_SCREEN,
  ASSUMPTION_NOTE_SCREEN,
  SURVEY_SCREEN,
  PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN,
  AUTOMATIC_THOUGHT_SCREEN,
  PREDICTION_FOLLOW_UP_SCREEN,
  PREDICTION_SUMMARY_SCREEN,
  PREDICTION_ONBOARDING_SCREEN,
  PREDICTION_REDIRECT_SCREEN,
  SHARE_SUCCESS_SCREEN,
  MARKDOWN_ARTICLE_SCREEN,
} from "./screens";
import ChallengeScreen from "./ChallengeScreen";
import DistortionScreen from "./DistortionScreen";
import AlternativeScreen from "./AlternativeScreen";
import FinishedScreen from "./FinishedScreen";
import FeelingScreen from "./FeelingScreen";
import FollowUpRequestScreen from "./followups/FollowUpRequestScreen";
import FollowUpFeelingScreen from "./followups/FollowUpFeelingScreen";
import FollowUpFeelingReviewScreen from "./followups/FollowUpFeelingReviewScreen";
import FollowUpNoteScreen from "./followups/FollowUpNoteScreen";
import FeedbackScreen from "./androidFeedback/FeedbackScreen";
import LeaveReview from "./androidFeedback/LeaveAReview";
import CheckUpSummaryScreen from "../checkups/CheckupSummaryScreen";
import AssumptionScreen from "./predictions/AssumptionScreen";
import AssumptionNoteScreen from "./predictions/AssumptionNoteScreen";
import SurveyScreen from "./survey/SurveyScreen";
import PredictionScheduleFollowUpScreen from "./predictions/PredictionScheduleFollowUpScreen";
import AutomaticThoughtScreen from "./AutomaticThoughtScreen";
import PredictionFollowUpScreen from "./predictions/PredictionFollowUpScreen";
import PredictionSummaryScreen from "./predictions/PredictionSummaryScreen";
import PredictionOnboardingScreen from "./predictions/PredictionOnboardingScreen";
import PredictionThoughtRedirectScreen from "./predictions/PredictionThoughtRedirectScreen";

export default createStackNavigator(
  {
    [THOUGHT_SCREEN]: ThoughtScreen,
    [AUTOMATIC_THOUGHT_SCREEN]: AutomaticThoughtScreen,
    [DISTORTION_SCREEN]: DistortionScreen,
    [CHALLENGE_SCREEN]: ChallengeScreen,
    [ALTERNATIVE_SCREEN]: AlternativeScreen,
    [FINISHED_SCREEN]: FinishedScreen,
    [FEELING_SCREEN]: FeelingScreen,
    [FOLLOW_UP_REQUEST_SCREEN]: FollowUpRequestScreen,
    [FOLLOW_UP_FEELING_SCREEN]: FollowUpFeelingScreen,
    [FOLLOW_UP_FEELING_REVIEW_SCREEN]: FollowUpFeelingReviewScreen,
    [FOLLOW_UP_NOTE_SCREEN]: FollowUpNoteScreen,
    [FEEDBACK_SCREEN]: FeedbackScreen,
    [FEEDBACK_LEAVE_REVIEW]: LeaveReview,
    [SURVEY_SCREEN]: SurveyScreen,
    [CHECKUP_SUMMARY_SCREEN]: CheckUpSummaryScreen,

    // Predictions
    [ASSUMPTION_SCREEN]: AssumptionScreen,
    [ASSUMPTION_NOTE_SCREEN]: AssumptionNoteScreen,
    [PREDICTION_FOLLOW_UP_SCHEDULE_SCREEN]: PredictionScheduleFollowUpScreen,
    [PREDICTION_FOLLOW_UP_SCREEN]: PredictionFollowUpScreen,
    [PREDICTION_SUMMARY_SCREEN]: PredictionSummaryScreen,
    [PREDICTION_ONBOARDING_SCREEN]: PredictionOnboardingScreen,
    [PREDICTION_REDIRECT_SCREEN]: PredictionThoughtRedirectScreen,
  },
  {
    initialRouteName: THOUGHT_SCREEN,
  }
);
