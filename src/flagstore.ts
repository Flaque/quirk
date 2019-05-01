/**
 * A place for boolean flags
 */

import { AsyncStorage } from "react-native";

const EXISTING_USER_KEY = "@Quirk:flags";

export type bool = "true" | "false";

export type Flag = "start-help-badge";

function getKey(flag: Flag): string {
  return EXISTING_USER_KEY + flag;
}

// Not exported to discourage use, prefer functions
async function set(flag: Flag, value: bool) {
  try {
    await AsyncStorage.setItem(getKey(flag), value);
  } catch (err) {
    console.error(err);
  }
}

export async function get(flag: Flag, def: bool): Promise<boolean> {
  try {
    const value = (await AsyncStorage.getItem(getKey(flag))) || def;
    return value === "true";
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function setFalse(flag: Flag): Promise<void> {
  set(flag, "false");
}

export async function setTrue(flag: Flag): Promise<void> {
  set(flag, "true");
}
