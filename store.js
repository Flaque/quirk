import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import uuidv4 from "uuid/v4";

export function getKey(info) {
  return `@Quirk:thoughts:${info}`;
}

export const saveExercise = async (
  uuid,
  automaticThought = "",
  cognitiveDistortions = "",
  challenge = "",
  alternativeThought = ""
) => {
  const thought = {
    automaticThought,
    cognitiveDistortions,
    challenge,
    alternativeThought,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    uuid: uuid || getKey(uuidv4()),
  };

  try {
    const thoughtString = stringify(thought);

    // No matter what, we NEVER save bad data.
    if (!thoughtString || thoughtString.length <= 0) {
      console.warn("something went very wrong stringifying this data");
      return {};
    }

    await AsyncStorage.setItem(thought.uuid, thoughtString);
    return thought;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExercise = async uuid => {
  try {
    await AsyncStorage.removeItem(uuid);
  } catch (error) {
    console.error(error);
  }
};

export const getExercise = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    let rows = await AsyncStorage.multiGet(keys);

    // It's better to lose data than to brick the app
    // (though losing data is really bad too)
    if (!rows) rows = [];

    // This filter removes "null", "undefined"
    // which we should _never_ ever ever ever let
    // get back to the user since it'll brick their app
    return rows.filter(n => n);
  } catch (error) {
    console.error(error);
  }
};
