export interface Hint {
  title: string;
  message: string;
  slug: string;
  order: number;
}

export const Hints: Array<Hint> = [
  {
    title: "📚 Tip #1: Read 'How to use Quirk'",
    message:
      "In the 'learn' section of this app, there's a full explanation of how to get started. Read this as soon as possible. It takes effort but will help you feel a lot better.",
    order: 0,
    slug: "read-how-to-use-quirk",
  },
  {
    title: "📚 Tip #2: This takes practice",
    message:
      "This is a muscle you build up over time. It's a bit like running or meditation. It requires some effort, but it can help you feel a lot better.",
    order: 1,
    slug: "its-practice",
  },
  {
    title: "📚 Tip #3: Be Alert",
    message:
      "As you go about your day, try to be extra aware of the points where you're upset, angry, anxious, or otherwise not great. When you note something, check-in with Quirk.",
    order: 2,
    slug: "be-alert",
  },
  {
    title: "📚 Tip #4: Use Quirk in the Moment",
    message:
      "If you're not doing well, pull out Quirk and record your thoughts as soon as possible. If you wait to later, it's harder to 'rewire' your thoughts.",
    order: 3,
    slug: "in-the-moment",
  },
  {
    title: "📚 Tip #5: Challenge Better",
    message:
      "When challenging thoughts; don't just negate your thoughts. If you're thinking \"oh I'm going to fail this interview,\" your challenge shouldn't just say \"I'm not going to fail this interview.\" That's just as distorted! Instead, ask yourself, why would it be so bad if I fail this interview? Maybe there's other interviews; maybe by failing the interview, we've gained experience at interviewing. ",
    order: 4,
    slug: "dont-negate",
  },
];
