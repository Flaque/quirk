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
    description: `ex: "That was a thorough waste of time"`,
  },
  {
    emoji: "👯‍",
    label: i18n.t("over_generalization"),
    slug: "overgeneralization",
    description: `ex: "Everyone will let me down"`,
  },
  {
    emoji: "🧠",
    label: i18n.t("mind_reading"),
    slug: "mind-reading",
    description: `ex: "I'll bet he hates me now'`,
  },
  {
    emoji: "🔮",
    label: i18n.t("fortune_telling"),
    slug: "fortune-telling",
    description: `ex: "I'll get sick at the party"`,
  },
  {
    emoji: "👎",
    label: i18n.t("magnification_of_the_negative"),
    slug: "magnification-of-the-negative",
    description: `Focusing only on what went wrong`,
  },
  {
    emoji: "👍",
    label: i18n.t("minimization_of_the_positive"),
    slug: "minimization-of-the-positive",
    description: `Ignoring the good things that happened`,
  },
  {
    emoji: "🤯",
    label: i18n.t("catastrophizing"),
    slug: "catastrophizing",
    description: `Focusing on the worst possible scenario`,
  },
  {
    emoji: "🎭",
    label: i18n.t("emotional_reasoning"),
    slug: "emotional-reasoning",
    description: `ex: "I feel afraid, so I'll have a panic attack"`,
  },
  {
    emoji: "✨",
    label: i18n.t("should_statements"),
    slug: "should-statements",
    description: `ex: "I should have been better"`,
  },
  {
    emoji: "🏷",
    label: i18n.t("labeling"),
    slug: "labeling",
    description: `ex: "He's a jerk"`,
  },
  {
    emoji: "👁",
    label: i18n.t("self_blaming"),
    slug: "self-blaming",
    description: `Taking all the blame on yourself`,
  },
  {
    emoji: "🧛‍",
    label: i18n.t("other_blaming"),
    slug: "other-blaming",
    description: `Assigning all the blame to someone else`,
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
