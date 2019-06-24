import i18n from "./i18n";

export interface CognitiveDistortion {
  emoji?: string;
  label: string;
  slug: string;
  selected?: boolean;
  description: string;
}

const distortions: CognitiveDistortion[] = [
  {
    emoji: "🌓",
    label: i18n.t("all_or_nothing_thinking"),
    slug: "all-or-nothing",
    description: i18n.t("all_or_nothing_thinking_one_liner"),
  },
  {
    emoji: "👯‍",
    label: i18n.t("over_generalization"),
    slug: "overgeneralization",
    description: i18n.t("overgeneralization_one_liner"),
  },
  {
    emoji: "🧠",
    label: i18n.t("mind_reading"),
    slug: "mind-reading",
    description: i18n.t("mind_reading_one_liner"),
  },
  {
    emoji: "🔮",
    label: i18n.t("fortune_telling"),
    slug: "fortune-telling",
    description: i18n.t("fortune_telling_one_liner"),
  },
  {
    emoji: "👎",
    label: i18n.t("magnification_of_the_negative"),
    slug: "magnification-of-the-negative",
    description: i18n.t("magnification_of_the_negative_one_liner"),
  },
  {
    emoji: "👍",
    label: i18n.t("minimization_of_the_positive"),
    slug: "minimization-of-the-positive",
    description: i18n.t("minimization_of_the_positive_one_liner"),
  },
  {
    emoji: "🤯",
    label: i18n.t("catastrophizing"),
    slug: "catastrophizing",
    description: i18n.t("catastrophizing_one_liner"),
  },
  {
    emoji: "🎭",
    label: i18n.t("emotional_reasoning"),
    slug: "emotional-reasoning",
    description: i18n.t("emotional_reasoning_one_liner"),
  },
  {
    emoji: "✨",
    label: i18n.t("should_statements"),
    slug: "should-statements",
    description: i18n.t("should_statements_one_liner"),
  },
  {
    emoji: "🏷",
    label: i18n.t("labeling"),
    slug: "labeling",
    description: i18n.t("labeling_one_liner"),
  },
  {
    emoji: "👁",
    label: i18n.t("self_blaming"),
    slug: "self-blaming",
    description: i18n.t("self_blaming_one_liner"),
  },
  {
    emoji: "🧛‍",
    label: i18n.t("other_blaming"),
    slug: "other-blaming",
    description: i18n.t("other_blaming_one_liner"),
  },
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
