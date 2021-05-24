import { Alert } from "./alerter";

const alerts: Alert[] = [
  {
    slug: "alternative-thought-title",
    priority: 0,
    title: "👋 Hey-o!",
    body: `Something's changed!

Thoughts shown here are now the alternative thought, not your initial thought. We changed this to cement the importance of changing your thought, not just recording them.

If you don't like it, you can change it in the settings.`,
  },
  {
    slug: "checkins",
    priority: 0,
    title: "👋 New Feature",
    body: `Quirk has optional reminders now!

They'll nudge you in the evenings every once and awhile to help you remember to record thoughts. They're off by default, but you can turn them on in the settings.

Love/hate them? Let me know by pressing the feedback button or sending an email to "ejc@quirk.fyi".
    `,
  },
  {
    slug: "lock-screen",
    priority: 0,
    title: "👋 Lock Screens!",
    body: `Quirk has a pincode lock screen now. 

You can turn it on in the settings. If you lock yourself out, send us an email.

Love/hate it? Let me know by pressing the feedback button or sending an email to "ejc@quirk.fyi".
    `,
  },
];

export default alerts;
