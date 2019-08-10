import distortions, { CognitiveDistortion } from "./distortions";

export interface Thought {
  automaticThought: string;
  alternativeThought: string;
  cognitiveDistortions: CognitiveDistortion[];
  challenge: string;
  immediateCheckup?: "better" | "worse" | "same";

  // Followup Stuff
  followUpDate?: string;
  followUpCompleted?: boolean;
  followUpCheckup?: "better" | "worse" | "same";
  followUpNote?: string;
}

export interface SavedThought extends Thought {
  // Only if saved
  createdAt: Date;
  updatedAt: Date;
  uuid: string;
}

export interface ThoughtGroup {
  date: string;
  thoughts: SavedThought[];
}

// This is a function instead of a constant to avoid some
// REAL weird JS bugs
export const newThought = (): Thought => {
  return {
    automaticThought: "",
    cognitiveDistortions: distortions.map(({ label, slug }) => {
      return { label, slug, selected: false, description: "" };
    }),
    challenge: "",
    alternativeThought: "",
  };
};

export function groupThoughtsByDay(thoughts: SavedThought[]): ThoughtGroup[] {
  const dates: string[] = [];
  const groups: ThoughtGroup[] = [];

  const sortedThoughts = thoughts.sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );

  for (const thought of sortedThoughts) {
    const date = new Date(thought.createdAt).toDateString();
    if (!dates.includes(date)) {
      dates.push(date);
      groups.push({
        date,
        thoughts: [thought],
      });
      continue;
    }

    groups[dates.length - 1].thoughts.push(thought);
  }

  return groups;
}
