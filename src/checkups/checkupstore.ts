import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import Sentry from "../sentry";
import uuidv4 from "uuid/v4";
import dayjs from "dayjs";

type Mood = "good" | "neutral" | "bad" | "unselected";

export interface Checkup {
  currentMood: Mood;
  predictedMood?: Mood;
  note?: string;
  goal?: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

const CHECKUP_SCHEDULE_KEY = "@Quirk:next-checkup-date";
const CHECKUP_KEY_PREFIX = `@Quirk:checkups:`;

function getKey(uuid: string) {
  return CHECKUP_KEY_PREFIX + uuid;
}

export function newCheckup(): Checkup {
  const date = new Date();
  return {
    currentMood: "unselected",
    uuid: uuidv4(),
    createdAt: date,
    updatedAt: date,
  };
}

export async function saveCheckup(checkup: Checkup) {
  try {
    if (!checkup.uuid) {
      throw new Error("No uuid on checkup, not storing");
    }
    checkup.updatedAt = new Date();

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

export async function getOrderedCheckups(): Promise<Checkup[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const checkupKeys = keys.filter(key => key.startsWith(CHECKUP_KEY_PREFIX));

    const data = await AsyncStorage.multiGet(checkupKeys);
    const checkups = data.map(([_, value]) => JSON.parse(value));

    return checkups.sort((a, b) =>
      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
    );
  } catch (err) {
    Sentry.captureException(err);
    return [];
  }
}

export async function getMostRecentCheckup(): Promise<Checkup | null> {
  try {
    const orderedCheckups = await getOrderedCheckups();
    if (orderedCheckups.length === 0) {
      return null;
    }

    return orderedCheckups[0];
  } catch (err) {
    Sentry.captureException(err);
    return null;
  }
}

export async function getNextCheckupDate(): Promise<string> {
  try {
    const date = await AsyncStorage.getItem(CHECKUP_SCHEDULE_KEY);
    if (!date) {
      // If we haven't had a checkup yet, schedule it for an hour ago
      return dayjs()
        .subtract(1, "h")
        .toISOString();
    }

    return date;
  } catch (err) {
    Sentry.captureException(err);
    return dayjs()
      .add(1, "week")
      .toISOString();
  }
}

export async function saveNextCheckupDate(date: string) {
  try {
    const isoString = dayjs(date).toISOString();
    await AsyncStorage.setItem(CHECKUP_SCHEDULE_KEY, isoString);
  } catch (err) {
    Sentry.captureException(err);
  }
}
