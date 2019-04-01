import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";

const HIDDEN_KEY = `@AlertStore:hidden`;
const NEW_USER_KEY = `@AlertStore:new-user`;

export async function hiddenAlerts(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(HIDDEN_KEY);
    return value ? JSON.parse(value) : []; // empty is fine and not an error
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function hide(slug: string): Promise<boolean> {
  try {
    const current = await hiddenAlerts();
    current.push(slug);

    await AsyncStorage.setItem(HIDDEN_KEY, stringify(current));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function hideMultipleAlerts(slugs: string[]): Promise<boolean> {
  try {
    const current = await hiddenAlerts();
    current.push(...slugs);

    await AsyncStorage.setItem(HIDDEN_KEY, stringify(current));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Checks if someone is a new user
// If this function has ever been called before, they're not a new user
export async function isNewUser(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(NEW_USER_KEY);
    if (!!value) {
      return false;
    }

    await AsyncStorage.setItem(NEW_USER_KEY, "false");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
