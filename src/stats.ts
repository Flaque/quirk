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
import dayjs from "dayjs";

Segment.initialize({
  androidWriteKey: "ZivFALGI9FH1L4WiAEY3o5PDtKwvLLxB",
  iosWriteKey: "BpLkO0nXEQJUJyjQCqZk5TWawTQN83QC",
});

// Don't rename these; it can mess a bunch of stuff down the pipe
export type ScreenType =
  | "form"
  | "help"
  | "intro"
  | "list"
  | "settings"
  | "payments";

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

export function userGrandfathered() {
  if (isInDev()) {
    return;
  }
  Segment.track("user_grandfathered");
}

/**
 * Bumps a counter everytime we find a _new_ user. This let's
 * us roughly understand and then share how many downloads Quirk
 * is getting.
 */
export function newuser() {
  if (isInDev()) {
    return;
  }
  Segment.track("newuser");
}

/**
 * Records if a user finished onboarding. This helps us
 * understand if there's a bug in the onboarding flow,
 * or if it's too long.
 */
export function endedOnboarding() {
  if (isInDev()) {
    return;
  }
  Segment.track("ended_onboarding");
}

/**
 * Thought Recorded
 */
export function thoughtRecorded() {
  if (isInDev()) {
    return;
  }
  Segment.track("thought_recorded");
}

/**
 * User Started Payment
 * Purpose: The user clicked on the subscription button,
 * but didn't necessarily finish subscribing.
 *
 * If this doesn't match the user_usbscribed
 * numbers, then there's likely a bug.
 */
export function userStartedPayment() {
  Segment.track("user_started_payment");
}

/**
 * User Encountered Payment Error
 */
export function userEncounteredPaymentError(err: string) {
  Segment.trackWithProperties("user_encountered_payment_error", {
    error: err,
  });
}

/**
 * User Subscribed
 */
export function userSubscribed(expirationUnixTimestamp: number) {
  Segment.trackWithProperties("user_subscribed", {
    expirationDate: dayjs.unix(expirationUnixTimestamp).format(),
  });
}

/**
 * Subscription Verified
 *
 * Purpose: Tracks HOW a person's sub was verified so
 * we can see if local cache actually works. If we're
 * seeing spikes in "online", we'll know that we're
 * using too much data and that the app might
 * be slow for folks.
 */
export function subscriptionVerified(
  method: "cache" | "online" | "grandfathered"
) {
  Segment.trackWithProperties("subscription_verified", {
    method,
  });
}

export function subscriptionUnverified(reason: "expired" | "never-bought") {
  Segment.trackWithProperties("subscription_unverified", {
    reason,
  });
}

export function subscriptionGivenForFreeDueToError() {
  Segment.track("subscription_given_for_free_due_to_error");
}

export function subscriptionFoundInCache(value: string) {
  Segment.trackWithProperties("subscription_found_in_cache", {
    value,
  });
}

/**
 * Basically production logs
 * @param properties
 */
export function log(label: string, properties?: object) {
  const args = { label, properties };
  if (isInDev()) {
    console.log(args);
  } else {
    Segment.trackWithProperties("log", args);
  }
}
