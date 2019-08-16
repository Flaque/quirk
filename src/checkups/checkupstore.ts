import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import Sentry from "../sentry";

type Mood = "good" | "neutral" | "bad";

export interface Checkup {
  currentMood: Mood;
  predictedMood: Mood;
  note?: string;
  uuid: string;
  date: string;
}

export async function saveCheckup(checkup: Checkup) {
  try {
    await AsyncStorage.setItem(checkup.uuid, stringify(checkup));
  } catch (err) {
    Sentry.captureException(err);
  }
}
