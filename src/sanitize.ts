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

import { Thought, SavedThought, newThought, ThoughtGroup } from "./thoughts";
import { defaults, isObject } from "lodash";

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

export function validThought(thought: Thought | SavedThought): boolean {
  if (!thought || !isObject(thought)) {
    return false;
  }

  // Check that we generally have the correct properties
  // The validate library can't handle empty strings, so this is a double check
  if (Object.keys(thought).length < 4) {
    return false;
  }

  // For items that DO exist check that they're the right types
  const validationErrors = thoughtSchema.validate(thought);
  if (validationErrors && validationErrors.length !== 0) {
    return false;
  }

  return true;
}

const groupSchema = new Schema({
  date: {
    type: String,
    required: true,
    length: { min: 1 },
  },
  thoughts: {
    type: Array,
    required: true,
    length: { min: 1 },
  },
});

export function validThoughtGroup(group: ThoughtGroup): boolean {
  if (!group) {
    return false;
  }

  const validationErrors = groupSchema.validate(group);
  if (validationErrors && validationErrors.length !== 0) {
    return false;
  }

  if (!group.thoughts.every(validThought)) {
    return false;
  }

  return true;
}

// Attempts to "fix" an incorrect thought with sensible defaults
export function maybeRepairThought(thought: any): Thought {
  // Never repair a valid thought.
  if (validThought(thought)) {
    return thought as Thought;
  }

  if (!thought || !isObject(thought)) {
    return newThought();
  }

  return defaults(thought, newThought());
}
