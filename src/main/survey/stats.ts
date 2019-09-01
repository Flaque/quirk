import { initSegment } from "../../stats";
import * as Segment from "expo-analytics-segment";
import isInDev from "../../isInDev";

initSegment();

export function userRecordedDisappointedSurvey(answer: string) {
  if (isInDev()) {
    return;
  }
  Segment.trackWithProperties("user_recorded_disappointed_survey", {
    disappointedAnswer: answer,
  });
}

export function userRecordedBenefitSurvey(answer: string) {
  if (isInDev()) {
    return;
  }
  Segment.trackWithProperties("user_recordeded_benefit_survey", {
    answer: answer,
  });
}

export function userRecordedTypeOfPersonSurvey(answer: string) {
  if (isInDev()) {
    return;
  }
  Segment.trackWithProperties("user_recordeded_type_of_person_survey", {
    answer: answer,
  });
}

export function userRecordedCouldImproveSurvey(answer: string) {
  if (isInDev()) {
    return;
  }
  Segment.trackWithProperties("user_recordeded_could_improve_survey", {
    answer: answer,
  });
}
