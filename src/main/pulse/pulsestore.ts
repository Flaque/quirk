import { AsyncStorage } from "react-native";
import Sentry from "../../sentry";
import { PulseStamp } from "./types";
import { pushScore, getCompleteHistory } from "./score";

const KEY_PULSE_HISTORY = `@Quirk:pulse:history`;

export async function getPulseHistory(): Promise<PulseStamp[]> {
  try {
    const value = (await AsyncStorage.getItem(KEY_PULSE_HISTORY)) || "[]";
    return getCompleteHistory(JSON.parse(value));
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}

export async function getCurrentPulse(): Promise<number> {
  const history = await getPulseHistory();
  return history[history.length - 1] ? history[history.length - 1].score : 0;
}

export async function addScoreToHistory(score: number) {
  try {
    const history = pushScore(await getPulseHistory(), score);
    await AsyncStorage.setItem(KEY_PULSE_HISTORY, JSON.stringify(history));
  } catch (err) {
    Sentry.captureException(err);
  }
}
