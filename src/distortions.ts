export interface CognitiveDistortion {
  label: string;
  slug: string;
  selected?: boolean;
}

const distortions: CognitiveDistortion[] = [
  { label: "All or Nothing Thinking", slug: "all-or-nothing" },
  { label: "Overgeneralization", slug: "overgeneralization" },
  { label: "Filtering out the Positive", slug: "filtering-out-the-positive" },
  { label: "Mind Reading", slug: "mind-reading" },
  { label: "Fortune Telling", slug: "fortune-telling" },
  {
    label: "Magnification of the Negative",
    slug: "magnification-of-the-negative",
  },
  {
    label: "Minimization of the Positive",
    slug: "minimization-of-the-positive",
  },
  { label: "Emotional Reasoning", slug: "emotional-reasoning" },
  { label: "Should Statements", slug: "should-statements" },
  { label: "Labeling", slug: "labeling" },
  { label: "Self-Blaming", slug: "self-blaming" },
  { label: "Other-Blaming", slug: "other-blaming" },
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
