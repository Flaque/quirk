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
    return !!code;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export async function resetCode(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (err) {
    Sentry.captureException;
  }
}
