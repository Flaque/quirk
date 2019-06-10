import { Platform } from "react-native";
import * as InAppPurchases from "react-native-iap";
import * as subscriptionStore from "./subscriptionstore";
import dayjs from "dayjs";

const IOS_SKU = "fyi.quirk.subscription";
const subscriptionSku = Platform.select({
  ios: IOS_SKU,
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

  console.log(subscriptions);

  // I _think_ multiple months of subscriptions are
  // considered multiple purchases. Also if somone
  // unsubscribes and then resubscribes, that's
  // likely multiple purchases. Hence the sorting
  // for the "most recent" purchase date.
  const mostRecentPurchaseDate = subscriptions
    .map(sub => sub.transactionDate)
    .sort()
    .reverse()[0];

  return mostRecentPurchaseDate; // Unix Timestamp
}

export async function requiresPayment(): Promise<boolean> {
  // Step 1: Check local storage first
  if (await subscriptionStore.hasValidSubscription()) {
    return false;
  }

  // Step 2: Can they connect to the stores?
  const canMakePayments = await InAppPurchases.initConnection();
  if (!canMakePayments) {
    return false; // They get a free ride if there's a problem here
  }

  // Step 3: Check online if they've ever purchased anything
  const purchases = await InAppPurchases.getAvailablePurchases();
  if (!purchases || purchases.length === 0) {
    return true;
  }

  // Step 4: Check online if their most recent purchase is still valid
  const purchaseDate = await getMostRecentOnlinePurchaseDate(purchases);
  console.log(purchaseDate);
  const expirationDate = dayjs.unix(purchaseDate).add(1, "month");

  // Is today after the expiration date?
  const isExpired = dayjs().isAfter(expirationDate);

  // Cache this so we don't have to look it up again
  if (!isExpired) {
    subscriptionStore.storeExpirationDate(expirationDate.unix());
    return false;
  }

  return true;
}

export async function getSubscriptionDefinition(): Promise<
  InAppPurchases.Product<string>
> {
  const products = await InAppPurchases.getProducts([subscriptionSku]);

  // @ts-ignore because _technically_ apple could return nothing
  if (!products || products.length === 0 || !products[0]) {
    throw new Error("There are no payments possible, that's really bad");
  }

  return products[0];
}
