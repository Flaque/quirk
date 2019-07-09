/**
 * This is Quirk's public stats file and is part of
 * how we do things.
 *
 * Quirk should be open; code _and_ stats. Typically,
 * a developer gets stats through the app stores, and even
 * if the app is open source, those stats tend to be kept
 * private.
 *
 * Quirk's not gonna be like that. Instead, aggregate stats
 * will be shared publicly, as long as it protects the privacy
 * of the user.
 *
 * That let's community members:
 * - understand the status of the project
 * - see the fruits of their support
 *
 * Plus, it allows researchers and mental health professionals
 * access the info in order to develop better treatments.
 *
 * These stats were created by you, the user.
 * **So you, the user, should have access to it.**
 *
 * (Note: we don't necessarily share all financial info
 * publicly due to legal + company risk)
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
 * Thoughts recorded counter. If this drops, we have a huge
 * bug.
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

/**
 * If there's a spike in expired, there's probably a payment error.
 */
export function subscriptionUnverified(reason: "expired" | "never-bought") {
  Segment.trackWithProperties("subscription_unverified", {
    reason,
  });
}

/**
 * If there's a spike these, there's probably a payment error.
 */
export function subscriptionGivenForFreeDueToError() {
  Segment.track("subscription_given_for_free_due_to_error");
}

/**
 * If this drops dramatically, there's a cache bug
 */
export function subscriptionFoundInCache(value: string) {
  Segment.trackWithProperties("subscription_found_in_cache", {
    value,
  });
}

/**
 * This lets us understand how people fill out the fields,
 * and if people actually understand how the app works.
 */
export function userFilledOutFormField(
  value: "automatic" | "distortions" | "challenge" | "alternative"
) {
  Segment.track("user_filled_out_" + value);
}

/**
 * This "roughly" let's us understand if our descriptions
 * make sense. If we change the descriptions, and people
 * start selecting a particular distortion less, then
 * it could mean the description is bad.
 */
export function userCheckedDistortion(slug: string) {
  Segment.track("user_checked_distortion_" + slug);
}

export function userClickedQuirkGuide() {
  Segment.track("user_clicked_quirk_guide");
}

export function userCantOpenLink() {
  Segment.track("user_cant_open_link");
}

export function userTurnedOnNotifications() {
  Segment.track("user_turned_on_notifications");
}

export function userTurnedOffNotifications() {
  Segment.track("user_turned_off_notifications");
}

export function userReviewed() {
  Segment.track("user_reviewed");
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
