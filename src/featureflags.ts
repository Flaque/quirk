import { getUserID } from "./id";
import { identifyWithTraits } from "./stats";

function toHash(str: string) {
  var hash = 0;
  if (!str || str.length == 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Checks if this user passes a feature flag, records
 * a Segment identify that marks them as on/off.
 * @param name ex: "x-feature"
 * @param oneIn ex: 10 for 1 in 10 chance; 5 for 1 in 5 chance.
 */
export async function passesFeatureFlag(
  name: string,
  oneIn: number
): Promise<boolean> {
  const id = await getUserID();
  const diceRoll = toHash(id) % (oneIn - 1);
  const passes = diceRoll === 0;

  identifyWithTraits(id, {
    [`feature-flag-${name}`]: passes ? "true" : "false",
  });

  return passes;
}
