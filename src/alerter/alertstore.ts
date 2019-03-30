import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";

const KEY = `@AlertStore:hidden`;

export async function hiddenAlerts(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(KEY);
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

    await AsyncStorage.setItem(KEY, stringify(current));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
