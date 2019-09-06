import { AsyncStorage } from "react-native";
import Sentry from "../sentry";

const KEY_PINCODE = `@Quirk:pincode`;

export async function setPincode(code: string): Promise<boolean> {
  if (code.length !== 4) {
    throw new Error("Pincodes must be 4 characters");
  }

  try {
    await AsyncStorage.setItem(KEY_PINCODE, code);
    return true;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export async function getPincode(): Promise<string> {
  try {
    const code = await AsyncStorage.getItem(KEY_PINCODE);
    return code || "";
  } catch (err) {
    Sentry.captureException(err);
    return "";
  }
}

export async function removePincode(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY_PINCODE);
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function isCorrectPincode(code: string): Promise<boolean> {
  if (code.length !== 4) {
    return false;
  }

  try {
    const actualCode = await AsyncStorage.getItem(KEY_PINCODE);
    if (!actualCode) {
      return false;
    }

    return code === actualCode;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export async function hasPincode(): Promise<boolean> {
  try {
    const code = await AsyncStorage.getItem(KEY_PINCODE);
    return code && code.length > 0;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}
