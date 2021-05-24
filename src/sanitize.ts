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
 *
 * You may also wonder:
 * > Woah woah woah why don't you just use a validation library?
 *
 * Answer: I can't find one that's actually more effective than checking for what I need.
 * I tried a bunch and they all had unrurly awful problems. 🤷‍
 */

import { Thought, SavedThought, newThought, ThoughtGroup } from "./thoughts";
import { defaults, isObject, has } from "lodash";

export function validThought(thought: Thought | SavedThought): boolean {
  if (!thought || !isObject(thought)) {
    return false;
  }

  // Check that we generally have the correct properties
  // The validate library can't handle empty strings, so this is a double check
  if (Object.keys(thought).length < 4) {
    return false;
  }

  if (typeof thought.automaticThought !== "string") {
    return false;
  }

  return true;
}

export function validThoughtGroup(group: ThoughtGroup): boolean {
  if (!group) {
    return false;
  }

  const hasCorrectKeys =
    has(group, "date") && has(group, "thoughts[0].automaticThought");
  if (!hasCorrectKeys) {
    return false;
  }

  if (!group.date) {
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
