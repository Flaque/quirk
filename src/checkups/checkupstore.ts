import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import Sentry from "../sentry";
import uuidv4 from "uuid/v4";

type Mood = "good" | "neutral" | "bad";

export interface Checkup {
  currentMood: Mood;
  predictedMood?: Mood;
  note?: string;
  uuid: string;
  date: string;
}

const THOUGHTS_KEY_PREFIX = `@Quirk:thoughts:`;

function getKey(uuid: string) {
  return THOUGHTS_KEY_PREFIX + uuid;
}

export function newCheckup(currentMood: Mood): Checkup {
  return {
    currentMood,
    uuid: uuidv4(),
    date: new Date().toISOString(),
  };
}

export async function saveCheckup(checkup: Checkup) {
  try {
    if (!checkup.uuid) {
      throw new Error("No uuid on checkup, not storing");
    }

    await AsyncStorage.setItem(getKey(checkup.uuid), stringify(checkup));
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function getCheckup(uuid: string): Promise<Checkup> {
  try {
    const data = await AsyncStorage.getItem(getKey(uuid));
    const checkup: Checkup = JSON.parse(data);
    return checkup;
  } catch (err) {
    Sentry.captureException(err);
    return null;
  }
}

export async function getAllCheckups(uuid: string): Promise<Checkup[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const checkupKeys = keys.filter(key => key.startsWith(THOUGHTS_KEY_PREFIX));
    const checkups = await AsyncStorage.multiGet(checkupKeys);
    return checkups.map(([_, value]) => JSON.parse(value));
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}
