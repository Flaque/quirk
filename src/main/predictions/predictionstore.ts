import { AsyncStorage } from "react-native";
import Sentry from "../../sentry";
import stringify from "json-stringify-safe";
import dayjs from "dayjs";
import uuidv4 from "uuid/v4";

export interface Prediction {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;

  eventLabel?: string;

  predictedExperience?: "bad" | "neutral" | "good";
  actualExperience?: "bad" | "neutral" | "good";

  predictedExperienceNote?: string;
  actualExperienceNote?: string;

  followUpAt?: Date;
}

export function newPrediction() {
  const date = new Date();
  return {
    uuid: uuidv4(),
    createdAt: date,
    updatedAt: date,
  };
}

const PREDICTION_KEY_PREFIX = `@Quirk:predictions:`;

function getKey(uuid: string) {
  return PREDICTION_KEY_PREFIX + uuid;
}

export async function savePrediction(prediction: Prediction): Promise<void> {
  try {
    if (!prediction.uuid) {
      throw new Error("No uuid on prediction, not storing");
    }
    prediction.updatedAt = new Date();

    await AsyncStorage.setItem(getKey(prediction.uuid), stringify(prediction));
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function getPrediction(uuid: string): Promise<Prediction> {
  try {
    const data = await AsyncStorage.getItem(getKey(uuid));
    const pred: Prediction = JSON.parse(data);
    return pred;
  } catch (err) {
    Sentry.captureException(err);
    return null;
  }
}

export async function deletePrediction(uuid: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(getKey(uuid));
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function getOrderedPredictions(): Promise<Prediction[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const checkupKeys = keys.filter(key =>
      key.startsWith(PREDICTION_KEY_PREFIX)
    );

    const data = await AsyncStorage.multiGet(checkupKeys);
    const exercises = data.map(([_, value]) => JSON.parse(value));

    return exercises.sort((a, b) =>
      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
    );
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}
