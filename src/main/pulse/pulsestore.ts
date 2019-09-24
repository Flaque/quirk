import { AsyncStorage } from "react-native";
import Sentry from "../../sentry";

const KEY_PULSE_SCORE = `@Quirk:pulse:score`;

export async function getPulseScore(): Promise<number> {
  try {
    const value = (await AsyncStorage.getItem(KEY_PULSE_SCORE)) || "0";
    return parseInt(value);
  } catch (err) {
    Sentry.captureException(err);
    return 0;
  }
}
