import Content from "../Content";

export const pages = [
  // One
  `# We can't predict the future

But boy do we try do. Quirk's predictions feature is designed to help you overcome Fortune Telling 

`,

  // Two
  `# Predictions replaces your TODO app.

Predictions can replace your existing TODO app. Most TODO tools aren't designed with your mental health in mind and can actually make you feel worse.

`,

  // Three
  `# Quirk is _really_ private. 🔐

**We have no way to read your thoughts.** All the text you write in the app never leaves your phone. 

Since we don't have an account system right now, we don't collect your email or phone number or any other obvious personally identifiable information.

If you don't believe us, you can always go look for yourself. As far as we know, **Quirk's the only open source mental health app.**

As a disclaimer, we do record some anonymous analytics about certain features to make sure we haven't released a bug. If you're curious, there's more details on our website.
`,

  // Four
  `# You can try Quirk for free.

And after that, it's a small monthly subscription about the price of a ham sandwich. 🥪

This helps us create a long-term, sustainable product without ads or one-off in-app purchases.

If Quirk helps you feel better, then it's likely worth the price. If not, there's cancellation instructions within the app. 

We hope you'll love Quirk as much as we do. ❤️
`,
];

export const title = "Predictions";
export const description = "Let's learn a bit about Quirk's weirdest feature.";

const content: Content = {
  pages,
  title,
  description,
  slug: "predictions",
};

export default content;
