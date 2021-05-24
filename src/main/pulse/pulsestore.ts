import { AsyncStorage } from "react-native";
import Sentry from "../../sentry";
import { PulseStamp } from "./types";
import { pushScore, getCompleteHistory } from "./score";
import { Boost } from "./constants";
import { passesFeatureFlag } from "../../featureflags";

const KEY_PULSE_HISTORY = `@Quirk:pulse:history`;
const KEY_BOOST_QUEUE = `@Quirk:pulse:boost-queue`;

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

export async function addScoreToHistory(score: number): Promise<PulseStamp[]> {
  try {
    const history = pushScore(await getPulseHistory(), score);
    await AsyncStorage.setItem(KEY_PULSE_HISTORY, JSON.stringify(history));
    return getCompleteHistory(history);
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}

async function getBoostQueue(): Promise<Array<Boost>> {
  try {
    const value = (await AsyncStorage.getItem(KEY_BOOST_QUEUE)) || "[]";
    return JSON.parse(value);
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}

export async function scheduleBoost(boost: Boost) {
  try {
    const queue = await getBoostQueue();
    queue.push(boost);
    await AsyncStorage.setItem(KEY_BOOST_QUEUE, JSON.stringify(queue));
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function consumeBoosts(): Promise<Array<Boost>> {
  try {
    const boosts = await getBoostQueue();
    await AsyncStorage.setItem(KEY_BOOST_QUEUE, JSON.stringify([])); // wipe boosts
    return boosts;
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}
