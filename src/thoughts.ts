import distortions, { CognitiveDistortion } from "./distortions";

export interface Thought {
  automaticThought: string;
  alternativeThought: string;
  cognitiveDistortions: CognitiveDistortion[];
  challenge: string;
}

export interface SavedThought extends Thought {
  // Only if saved
  createdAt: Date;
  updatedAt: Date;
  uuid: string;
}

export interface ThoughtGroup {
  date: string;
  thoughts: Thought[];
}

// This is a function instead of a constant to avoid some
// REAL weird JS bugs
export const newThought = (): Thought => {
  return {
    automaticThought: "",
    cognitiveDistortions: distortions.map(({ label, slug }) => {
      return { label, slug, selected: false };
    }),
    challenge: "",
    alternativeThought: "",
  };
};

export function groupThoughtsByDay(thoughts: SavedThought[]): ThoughtGroup[] {
  const dates: string[] = [];
  const groups: ThoughtGroup[] = [];

  for (const thought of thoughts) {
    const date = thought.createdAt.toDateString();
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
