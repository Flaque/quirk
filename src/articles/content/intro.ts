import Content from "../Content";

export const pages = [
  // One
  `# Quirk is a Cognitive Behavioral Therapy app.

Or at least it's based on CBT. No app is going to replace your therapist and 
this one isn't trying to.

Instead, Quirk takes the exercises you might get from a therapist and gives them 
superpowers. 

**You don't need to be seeing a therapist to use Quirk.** You don't even need to be diagnosed with anything; Quirk's helped thousands of people who never thought they had any form of depression or anxiety.

But if you are seeing a therapist, all the better. 
`,

  // Two
  `# Quirk works pretty well.

We can't _guarantee_ that Quirk will help you feel better, but the majority of people feel better after Quirk's exercises. And the more you use Quirk, the more likely you are to report feeling better. As of this writing, about **1,000 people** have said they felt better since we started asking. 

We're not all that surprised since CBT itself is quite effective. One study called it the "gold standard" of psychotherapy and it's used most modern therapists. 

So **we encourage you to give Quirk your _best_ try.** Take it seriously and there's a reasonable chance you'll feel a lot better overall.
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

export const title = "Hey there 👋";
export const description = "Welcome to Quirk, let's slow down for a moment.";

const content: Content = {
  pages,
  title,
  description,
  slug: "intro",
};

export default content;
