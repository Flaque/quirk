/**
 * This is Quirk's public stats file and is part of the
 * Open-Quirk project.
 *
 * **What's the Open Quirk Project?**
 * Quirk should be open; code _and_ stats. Typically,
 * a developer gets stats through the app stores, and even
 * if the app is open source, those stats tend to be kept
 * private.
 *
 * Quirk's not gonna be like that. Instead, stats will
 * be shared openly.
 *
 * That let's community members:
 * - understand the status of the project
 * - see the fruits of their support
 *
 * Plus, it allows researchers and mental health professionals
 * access the info in order to develop better treatments.
 *
 * These stats are valuable data that's created by
 * you, the user. **So you, the user, should have access to it.**
 */

import { Segment } from "expo";
import isInDev from "./isInDev";

Segment.initialize({
  androidWriteKey: "ZivFALGI9FH1L4WiAEY3o5PDtKwvLLxB",
  iosWriteKey: "BpLkO0nXEQJUJyjQCqZk5TWawTQN83QC",
});

// Don't rename these; it can mess a bunch of stuff down the pipe
export type ScreenType = "main" | "help" | "intro" | "list" | "settings";

/**
 * Screen calls bump a counter every time someone sees a particular screen.
 *
 * **Example Info:**
 * If lots of users don't look at the help screen, maybe it's
 * broken! Similarly, if people use it a _lot_ then maybe we should
 * invest in making it better, because a single trip isn't good
 * enough.
 */
export function screen(val: ScreenType) {
  if (isInDev()) {
    return;
  }
  Segment.screen(val);
}
