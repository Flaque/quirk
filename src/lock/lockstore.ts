import { AsyncStorage } from "react-native";
import Sentry from "../sentry";

const PREFIX = `@Quirk:pincode:`;

export async function setPincode(code: string): Promise<boolean> {
  if (code.length !== 4) {
    throw new Error("Pincodes must be 4 characters");
  }

  try {
    await AsyncStorage.setItem(PREFIX, code);
    return true;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export async function isCorrectPincode(code: string): Promise<boolean> {
  console.log(code.length, code);
  if (code.length !== 4) {
    return false;
  }

  try {
    const actualCode = await AsyncStorage.getItem(PREFIX);
    console.log(actualCode, code);
    if (!actualCode) {
      return false;
    }

    return code === actualCode;
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}
