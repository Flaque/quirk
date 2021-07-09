import dayjs from "dayjs";
import { Prediction } from "./predictionstore";

export const getPredictionState = (
  prediction: Prediction
): "waiting" | "ready" | "complete" => {
  const hasCompletedActual = !!prediction.actualExperience;
  if (hasCompletedActual) {
    return "complete";
  }

  const isAfterFollowUp = dayjs().isAfter(dayjs(prediction.followUpAt));
  if (!isAfterFollowUp) {
    return "waiting";
  }

  return "ready";
};

const score = {
  good: 1,
  neutral: 0,
  bad: -1,
};

export const getPredictionResult = (
  prediction: Prediction
): "correct" | "better" | "worse" => {
  if (prediction.actualExperience === prediction.predictedExperience) {
    return "correct";
  }

  if (
    score[prediction.actualExperience] > score[prediction.predictedExperience]
  ) {
    return "better";
  }

  return "worse";
};
