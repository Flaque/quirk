import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import uuidv4 from "uuid/v4";
import { Thought, SavedThought } from "./thoughts";

const EXISTING_USER_KEY = "@Quirk:existing-user";
const THOUGHTS_KEY_PREFIX = `@Quirk:thoughts:`;

export function getThoughtKey(info): string {
  return THOUGHTS_KEY_PREFIX + info;
}

export async function exists(key: string): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(key);
    return !!value;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getIsExistingUser(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(EXISTING_USER_KEY);
    return !!value;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function setIsExistingUser() {
  try {
    await AsyncStorage.setItem(EXISTING_USER_KEY, "true");
  } catch (err) {
    console.error(err);
  }
}

export const saveExercise = async (
  thought: SavedThought | Thought
): Promise<Thought> => {
  let saveableThought: SavedThought;

  const isSavedThought = (thought as SavedThought).uuid === undefined;
  if (isSavedThought) {
    saveableThought = {
      uuid: getThoughtKey(uuidv4()),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...thought,
    };
  } else {
    saveableThought = thought as SavedThought;
    saveableThought.updatedAt = new Date();
  }

  try {
    const thoughtString = stringify(saveableThought);

    // No matter what, we NEVER save bad data.
    if (!thoughtString || thoughtString.length <= 0) {
      console.warn("something went very wrong stringifying this data");
      return saveableThought;
    }

    await AsyncStorage.setItem(saveableThought.uuid, thoughtString);
    return saveableThought;
  } catch (error) {
    console.error(error);
    return saveableThought;
  }
};

export const deleteExercise = async (uuid: string) => {
  try {
    await AsyncStorage.removeItem(uuid);
  } catch (error) {
    console.error(error);
  }
};

export const getExercises = async () => {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter(key =>
      key.startsWith(THOUGHTS_KEY_PREFIX)
    );

    let rows = await AsyncStorage.multiGet(keys);

    // It's better to lose data than to brick the app
    // (though losing data is really bad too)
    if (!rows) {
      rows = [];
    }

    // This filter removes "null", "undefined"
    // which we should _never_ ever ever ever let
    // get back to the user since it'll brick their app
    return rows.filter(n => n);
  } catch (error) {
    console.error(error);
    return [];
  }
};
