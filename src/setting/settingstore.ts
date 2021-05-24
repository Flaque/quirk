import { AsyncStorage } from "react-native";

const PREFIX = `@SettingsStore:`;

function getKey(slug: string) {
  return PREFIX + slug;
}

export async function getSettingOrSetDefault(
  slug: string,
  defaultValue: string
): Promise<string> {
  try {
    const result = await AsyncStorage.getItem(getKey(slug));

    if (!result || result.length === 0) {
      // We don't use the wrapped version of setSetting here
      // so we correctly attribute the error
      await AsyncStorage.setItem(getKey(slug), defaultValue);
      return await AsyncStorage.getItem(getKey(slug));
    }

    return result;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function setSetting<T extends string>(
  slug: string,
  value: T
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(getKey(slug), value);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
