import { initSegment } from "../../stats";
import * as Segment from "expo-analytics-segment";

initSegment();

export function userStartedPrediction() {
  Segment.track("user_started_prediction");
}

export function userRecordedPredictionEvent() {
  Segment.track("user_recorded_prediction_event");
}

export function userRecordedExpectedExperienceNote() {
  Segment.track("user_recorded_expected_experience_note");
}

export function userRecordedExpectedExperience(experience: string) {
  Segment.trackWithProperties("user_recorded_expected_experience", {
    experience,
  });
}

export function userRecordedActualExperience(experience: string) {
  Segment.trackWithProperties("user_recorded_actual_experience", {
    experience,
  });
}

export function userScheduledPredictionFollowUp(time: string) {
  Segment.trackWithProperties("user_scheduled_prediction_follow_up", {
    time,
  });
}

export function userFollowedUpOnPrediction(wasEarly: boolean) {
  Segment.trackWithProperties("user_followed_up_on_prediction", {
    wasEarly,
  });
}
