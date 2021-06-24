import { AsyncStorage } from "react-native";
import Sentry from "../sentry";

const USER_ID_KEY = `@IDStore:userID`;

export async function storeUserID(userID: string) {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, userID);
  } catch (err) {
    Sentry.captureException(err);
  }
}

export async function getUserID(): Promise<string> {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (err) {
    Sentry.captureException(err);
    return "";
  }
}
