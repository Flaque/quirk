export interface CognitiveDistortion {
  emoji?: string;
  label: string;
  slug: string;
  selected?: boolean;
}

const distortions: CognitiveDistortion[] = [
  { emoji: "🌓", label: "All or Nothing Thinking", slug: "all-or-nothing" },
  { emoji: "👯‍", label: "Overgeneralization", slug: "overgeneralization" },
  { emoji: "🧠", label: "Mind Reading", slug: "mind-reading" },
  { emoji: "🔮", label: "Fortune Telling", slug: "fortune-telling" },
  {
    emoji: "👎",
    label: "Magnification of the Negative",
    slug: "magnification-of-the-negative",
  },
  {
    emoji: "👍",
    label: "Minimization of the Positive",
    slug: "minimization-of-the-positive",
  },
  { emoji: "🤯", label: "Catastrophizing", slug: "catastrophizing" },
  { emoji: "🎭", label: "Emotional Reasoning", slug: "emotional-reasoning" },
  { emoji: "✨", label: "Should Statements", slug: "should-statements" },
  { emoji: "🏷", label: "Labeling", slug: "labeling" },
  { emoji: "👁", label: "Self-Blaming", slug: "self-blaming" },
  { emoji: "🦹‍", label: "Other-Blaming", slug: "other-blaming" },
].sort((first, second) => {
  const firstLabel = first.label.toUpperCase();
  const secondLabel = second.label.toUpperCase();

  if (firstLabel < secondLabel) {
    return -1;
  }

  if (firstLabel > secondLabel) {
    return 1;
  }

  return 0;
}); // Alphabetical sorting

export default distortions;
