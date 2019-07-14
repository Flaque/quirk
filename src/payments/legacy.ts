/**
 * REMOVE AFTER JULY 13th 2020!
 *
 * This is an interface between the new payment system (RevenueCat)
 * and the old payment system (which we did by hand).
 *
 * It only serves to migrate the couple hundred users over.
 *
 * If they're not migrated by 2020, (IE: we haven't seen them)
 * we can pretty safely assume their subscription has been canceled.
 *
 * Plus, if we're still alive in 2020, holy shit.
 */
import { isLegacySubscriber } from "../payments_legacy";
import {
  hasCheckedLegacyMigration,
  setCheckedLegacyMigration,
} from "../payments_legacy/subscriptionstore";
import { isSubscribed } from ".";
import Purchases from "react-native-purchases";

export const needsLegacyMigration = async (): Promise<boolean> => {
  // Don't go through all the network calls all the time
  if (await hasCheckedLegacyMigration()) {
    await setCheckedLegacyMigration();
    return false;
  }

  // If we're not in the legacy system, no need to worry
  if (!(await isLegacySubscriber())) {
    await setCheckedLegacyMigration();
    return false;
  }

  // If we're already in RevenueCat, no need to worry
  if (await isSubscribed()) {
    await setCheckedLegacyMigration();
    return false;
  }

  return true;
};

export const migrateLegacySubscriptions = async (): Promise<void> => {
  // Otherwise, we need to migrate the user.
  await Purchases.restoreTransactions();
  await setCheckedLegacyMigration();
};
