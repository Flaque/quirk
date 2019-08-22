import { AsyncStorage } from "react-native";
import Sentry from "../../sentry";

const HINT_ORDER_KEY = "@Quirk:hints-order";

export async function getCurrentHintIndex(): Promise<number> {
  try {
    const value = (await AsyncStorage.getItem(HINT_ORDER_KEY)) || "0";
    return parseInt(value);
  } catch (err) {
    Sentry.captureException(err);
    return 9999999;
  }
}

export async function incrementIndex(): Promise<void> {
  try {
    const index = await getCurrentHintIndex();
    await AsyncStorage.setItem(HINT_ORDER_KEY, `${index + 1}`);
  } catch (err) {
    Sentry.captureException(err);
  }
}
