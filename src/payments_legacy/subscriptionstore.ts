/**
 * Hello! Want free Quirk (basically) forever? There's
 * a secret way here to trick Quirk into never asking
 * any questions.
 *
 * I, Evan Conrad, Archduke of Computering for Quirk,
 * give you full legal authority to exploit it if you
 * can find it. (It's not that hard tbh).
 *
 * Though you probably could just send me an email
 * and I'll give you a freebie code.
 */
import { AsyncStorage } from "react-native";
import dayjs from "dayjs";
import Sentry from "../sentry";

const EXPIRATION_DATE = `@PaymentStore:EXPIRATION_DATE`;
const HAS_CHECKED_MIGRATION = `@PaymentStore:HAS_CHECKED_MIGRATION`;

// Records that the user subscribed today
export async function storeExpirationDate(expirationDateInUnix: number) {
  try {
    await AsyncStorage.setItem(
      EXPIRATION_DATE,
      expirationDateInUnix.toString()
    );
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function hasExpirationDate(): Promise<boolean> {
  try {
    const date = await AsyncStorage.getItem(EXPIRATION_DATE);
    return !!date;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getSubscriptionExpirationDate(): Promise<string> {
  try {
    const date = await AsyncStorage.getItem(EXPIRATION_DATE);
    if (!date) {
      // console.error("The user should never get here"); // TODO capture errors
      return dayjs().format("YYYY-MM-DD");
    }

    return dayjs.unix(parseInt(date)).format();
  } catch (err) {
    console.error(err);
    return "";
  }
}

// If true, the user needs their subscription checked, or they
// just haven't ever bought one.
// If false, the user can be assumed to have a subscription
export async function hasValidSubscription(): Promise<boolean> {
  // Everyone else gets subscriptions
  try {
    const date = await AsyncStorage.getItem(EXPIRATION_DATE);

    // The user has no subscription, so we should ask them for one
    if (!date) {
      return false;
    }

    // Is today before our month-long recheck date?
    return dayjs().unix() < parseInt(date);
  } catch (err) {
    console.error(err); // TODO: Catch error
    // If there's an error here, we should attempt to restore the user's purchases
    return false;
  }
}

export async function hasCheckedLegacyMigration(): Promise<boolean> {
  try {
    const hasChecked = await AsyncStorage.getItem(HAS_CHECKED_MIGRATION);
    return !!hasChecked;
  } catch (err) {
    return false;
  }
}

export async function setCheckedLegacyMigration() {
  try {
    await AsyncStorage.setItem(HAS_CHECKED_MIGRATION, "true");
  } catch (err) {
    Sentry.captureException(err);
  }
}
