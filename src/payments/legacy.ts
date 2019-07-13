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
import { requiresPayment as hasLegacySubscription } from "../payments_legacy";
import {
  hasCheckedLegacyMigration,
  setCheckedLegacyMigration,
} from "../payments_legacy/subscriptionstore";
import { isSubscribed } from ".";
import Purchases from "react-native-purchases";

export const maybeMigrateLegacySubscription = async (): Promise<void> => {
  // Don't go through all the network calls all the time
  if (await hasCheckedLegacyMigration()) {
    await setCheckedLegacyMigration();
    return;
  }

  // If we're not in the legacy system, no need to worry
  if (!(await hasLegacySubscription())) {
    await setCheckedLegacyMigration();
    return;
  }

  // If we're already in RevenueCat, no need to worry
  if (await isSubscribed()) {
    await setCheckedLegacyMigration();
    return;
  }

  // Otherwise, we need to migrate the user.
  await Purchases.restoreTransactions();
  await setCheckedLegacyMigration();
};
