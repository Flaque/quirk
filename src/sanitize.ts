/**
 * Stupid, crazy things can happen when you're storing data on a user's device.
 *
 * If a user _ever_ incorrectly stores data wrong, it can cause wild, unfixable
 * issues for a user. This file serves as the last line of defense against corrupted data.
 *
 * You may be thinking:
 * > Woah, woah, doesn't ✨TypeScript✨ protect us against invalid objects?
 *
 * Answer: no. In fact, TS can lure you into a false sense of security. TS compiles to
 * regular JS and only validates at compile time! This helps validate objects at _runtime_.
 */

import { Thought } from "./thoughts";
import { isEqual } from "lodash";

// require to avoid weirdness around untyped lib
const Schema = require("validate");

const thoughtSchema = new Schema({
  automaticThought: {
    type: String,
  },
  alternativeThought: {
    type: String,
  },
  cognitiveDistortions: {
    type: Array,
  },
  challenge: {
    type: String,
  },
});

export function validThought(thought: Thought): boolean {
  if (!thought) {
    return false;
  }

  // Check that we generally have the correct properties
  // The validate library can't handle empty strings, so this is a double check
  if (
    !isEqual(Object.keys(thought).sort(), [
      "alternativeThought",
      "automaticThought",
      "challenge",
      "cognitiveDistortions",
    ])
  ) {
    return false;
  }

  // For items that DO exist check that they're the right types
  const validationErrors = thoughtSchema.validate(thought);
  if (validationErrors && validationErrors.length !== 0) {
    return false;
  }

  return true;
}
