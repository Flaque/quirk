import { SavedThought } from "../thoughts";

function fixTimestamps(json): SavedThought {
  const createdAt: Date = new Date(json.createdAt);
  const updatedAt: Date = new Date(json.updatedAt);
  return {
    createdAt,
    updatedAt,
    ...json,
  };
}
export default function(data): SavedThought[] {
  return data
    .map(([_, value]) => JSON.parse(value))
    .filter(n => n) // Worst case scenario, if bad data gets in we don't show it.
    .map(fixTimestamps);
}
