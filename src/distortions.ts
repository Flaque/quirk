import i18n from "./i18n";

export interface CognitiveDistortion {
  emoji?: string;
  label: string;
  slug: string;
  selected?: boolean;
  example: string;
}

const distortions: CognitiveDistortion[] = [
  {
    emoji: "🌓",
    label: i18n.t("all_or_nothing_thinking"),
    slug: "all-or-nothing",
    example: "That was a thorough waste of time",
  },
  {
    emoji: "👯‍",
    label: i18n.t("over_generalization"),
    slug: "overgeneralization",
    example: "Everyone will let me down",
  },
  {
    emoji: "🧠",
    label: i18n.t("mind_reading"),
    slug: "mind-reading",
    example: "I'll bet he hates me now",
  },
  {
    emoji: "🔮",
    label: i18n.t("fortune_telling"),
    slug: "fortune-telling",
    example: "I'll get sick at the party",
  },
  {
    emoji: "👎",
    label: i18n.t("magnification_of_the_negative"),
    slug: "magnification-of-the-negative",
    example: "... example here",
  },
  {
    emoji: "👍",
    label: i18n.t("minimization_of_the_positive"),
    slug: "minimization-of-the-positive",
  },
  { emoji: "🤯", label: i18n.t("catastrophizing"), slug: "catastrophizing" },
  {
    emoji: "🎭",
    label: i18n.t("emotional_reasoning"),
    slug: "emotional-reasoning",
  },
  {
    emoji: "✨",
    label: i18n.t("should_statements"),
    slug: "should-statements",
  },
  { emoji: "🏷", label: i18n.t("labeling"), slug: "labeling" },
  { emoji: "👁", label: i18n.t("self_blaming"), slug: "self-blaming" },
  { emoji: "🧛‍", label: i18n.t("other_blaming"), slug: "other-blaming" },
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

export const emojiForSlug = (slug: string): string => {
  const distortion = distortions.find(dist => dist.slug === slug);
  return distortion ? distortion.emoji : "🤷‍";
};

export default distortions;
