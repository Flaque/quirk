import { SavedThought } from "../thoughts";
import { Checkup, getOrderedCheckups } from "../checkups/checkupstore";
import { getOrderedThoughts } from "../thoughtstore";
import dayjs from "dayjs";

export type Exercise = SavedThought | Checkup;

export interface ExerciseGroup {
  date: string;
  exercises: Array<Exercise>;
}

export function isThought(obj: Exercise): obj is SavedThought {
  if ((obj as SavedThought).automaticThought) {
    return true;
  }

  return false;
}

export function isCheckup(obj: Exercise): obj is Checkup {
  if ((obj as Checkup).currentMood) {
    return true;
  }

  return false;
}

function isSameDay(a: string | Date, b: string | Date) {
  return dayjs(a).format("DD-MM-YYYY") === dayjs(b).format("DD-MM-YYYY");
}

export async function getSortedExerciseGroups(): Promise<ExerciseGroup[]> {
  const thoughts = await getOrderedThoughts();
  const checkups = await getOrderedCheckups();

  // Combine existing exercises and sort them by days
  const exercises: Exercise[] = [].concat(thoughts, checkups);
  const sortedExercises = exercises.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Bucket the exercises into groups
  let groups: ExerciseGroup[] = [];
  let day = "";
  for (let ex of sortedExercises) {
    if (!day) {
      day = dayjs(ex.createdAt).toISOString();
    }

    // First exercise
    if (groups.length === 0) {
      groups.push({
        date: day,
        exercises: [ex],
      });
      continue;
    }

    // Exercise on the same day
    if (isSameDay(day, ex.createdAt)) {
      groups[groups.length - 1].exercises.push(ex);
    } else {
      // New day
      day = dayjs(ex.createdAt).toISOString();
      groups.push({
        date: dayjs(ex.createdAt).toISOString(),
        exercises: [ex],
      });
    }
  }

  return groups.reverse(); // Reverse shows today first
}
