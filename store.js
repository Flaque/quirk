import { AsyncStorage } from "react-native";
import stringify from "json-stringify-safe";
import uuidv4 from "uuid/v4";

export function getKey(info) {
  return `@Quirk:thoughts:${info}`;
}

export const saveExercise = async (
  automaticThought,
  cognitiveDistortions,
  challenge,
  alternativeThought
) => {
  const thought = {
    automaticThought,
    cognitiveDistortions,
    challenge,
    alternativeThought,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    uuid: getKey(uuidv4())
  };

  try {
    await AsyncStorage.setItem(thought.uuid, stringify(thought));
  } catch (error) {
    console.error(error);
  }
};

export const getExercise = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiGet(keys);
  } catch (error) {
    console.error(error);
  }
};
