import { Platform } from "react-native";
import * as InAppPurchases from "react-native-iap";
import * as subscriptionStore from "./subscriptionstore";
import dayjs from "dayjs";
import * as stats from "../stats";
import { getAppleExpirationDateFromRecentPurchases } from "./iosReceipts";
import { isGrandfatheredIntoFreeSubscription } from "../history/grandfatherstore";

const IOS_SKU = "fyi.quirk.subscription";
const ANDROID_ID = "basic_subscription";
const subscriptionSku = Platform.select({
  ios: IOS_SKU,
  android: ANDROID_ID,
});

async function getMostRecentOnlinePurchaseDate(
  purchases: InAppPurchases.Purchase[]
): Promise<number> {
  // Only grab the subscription purchase
  // This is future proofing if we ever offer "deals"
  // like 50% off Quirk, bulk purchases like "buy a year"
  // or just any other new payment options
  const subscriptions = purchases.filter(
    product => product.productId === subscriptionSku
  );

  // I _think_ multiple months of subscriptions are
  // considered multiple purchases. Also if somone
  // unsubscribes and then resubscribes, that's
  // likely multiple purchases. Hence the sorting
  // for the "most recent" purchase date.
  const mostRecentPurchaseDate = subscriptions
    // In miliseconds to be EXTRA SECURE FO REALSIES
    .map(sub => sub.transactionDate / 1000)
    .sort()
    .reverse()[0];

  return mostRecentPurchaseDate; // Unix Timestamp
}

// This phone doesn't appear to have ever subscribed.
// We can probably safely show them the payment screen immediately.
export async function isProbablyFreshlyInstalledApp(): Promise<boolean> {
  return !(await subscriptionStore.hasExpirationDate());
}

export async function requiresPayment(): Promise<boolean> {
  // Step 1: Check local storage first
  if (await subscriptionStore.hasValidSubscription()) {
    stats.subscriptionVerified("cache");
    return false;
  }

  // Step 2: Can they connect to the stores?
  const canMakePayments = await InAppPurchases.initConnection();
  if (!canMakePayments) {
    stats.subscriptionGivenForFreeDueToError();
    return false; // They get a free ride if there's a problem here
  }

  // (iOS) Step 3: validate the receipt locally and get the most
  // recent expiration date so we don't mess up Apple's review
  // process which can use shorter expiration dates. X.X
  if (Platform.OS === "ios") {
    const expirationDate = await getAppleExpirationDateFromRecentPurchases();
    if (!expirationDate) {
      stats.subscriptionUnverified("never-bought");
      return true;
    }

    const isExpired = dayjs().isAfter(dayjs.unix(expirationDate));
    if (isExpired) {
      stats.subscriptionUnverified("expired");
      return true;
    } else {
      subscriptionStore.storeExpirationDate(expirationDate);
      stats.subscriptionVerified("online");
      return false;
    }
  }

  // (Android) Step 3: Check online if they've ever purchased anything
  const purchases = (await InAppPurchases.getAvailablePurchases()) || [];
  if (!purchases || purchases.length === 0) {
    stats.subscriptionUnverified("never-bought");
    return true;
  }

  // (Android) Step 4: Check online if their most recent purchase is still valid
  const purchaseDate = await getMostRecentOnlinePurchaseDate(purchases);
  const expirationDate = dayjs.unix(purchaseDate).add(1, "month");

  // Is today after the expiration date?
  const isExpired = dayjs().isAfter(expirationDate);

  // Cache this so we don't have to look it up again
  if (!isExpired) {
    subscriptionStore.storeExpirationDate(expirationDate.unix());
    stats.subscriptionVerified("online");
    return false;
  } else {
    stats.subscriptionUnverified("expired");
  }

  return true;
}

export async function getSubscriptionDefinition(): Promise<
  InAppPurchases.Subscription<string>
> {
  const subscriptions = await InAppPurchases.getSubscriptions([
    subscriptionSku,
  ]);

  // @ts-ignore because _technically_ apple could return nothing
  if (!subscriptions || subscriptions.length === 0 || !subscriptions[0]) {
    throw new Error("There are no payments possible, that's really bad");
  }

  return subscriptions[0];
}
