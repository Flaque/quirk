import Purchases from "react-native-purchases";
import { REVENUECAT_API_KEY } from "react-native-dotenv";
import { userCanceledPayment, userRestoredPurchase, log } from "../stats";
import Sentry from "../sentry";
import { isGrandfatheredIntoFreeSubscription } from "../history/grandfatherstore";
import { Platform } from "react-native";

const ALL_ENTITLEMENTS = ["subscription"]; // what you can buy

// The current offering we're selling to folks
// TODO: A/B tests, deals, and other price changes can go here
const getMainOffering = () => {
  return "monthly";
};

const isValidPurchaserInfo = (info: PurchaserInfo) => {
  if (info.activeEntitlements === "undefined") {
    return false;
  }

  return info.activeEntitlements.some(ent => ALL_ENTITLEMENTS.includes(ent));
};

// Should be called once, likely on componentDidMount
export const setupRevenutCat = async () => {
  Purchases.setDebugLogsEnabled(!!__DEV__);
  Purchases.setup(REVENUECAT_API_KEY);

  if (Platform.OS === "ios") {
    Purchases.automaticAppleSearchAdsAttributionCollection = true;
  }
};

// Note that subscriptions can change prices or structure all the time.
export const getCurrentPurchasableSubscription = async (): Promise<Product> => {
  const entitlements = await Purchases.getEntitlements();
  return entitlements.subscription[getMainOffering()];
};

export const isSubscribed = async (): Promise<boolean> => {
  try {
    if (await isGrandfatheredIntoFreeSubscription()) {
      return true;
    }

    const purchaserInfo = await Purchases.getPurchaserInfo();
    return isValidPurchaserInfo(purchaserInfo);
  } catch (err) {
    log("User let in on error", err);
    Sentry.captureException(err);
    return true; // TODO set this to false once you figure out the error
  }
};

export const latestExpirationDate = async (): Promise<string> => {
  const purchaserInfo = await Purchases.getPurchaserInfo();
  return purchaserInfo.latestExpirationDate;
};

export const alias = (txt: string) => {
  Purchases.createAlias(txt);
};

/**
 * Attempts to purchase a subscription,
 */
export const purchaseSubscription = async (): Promise<
  "error" | "canceled" | "success"
> => {
  try {
    const product = await getCurrentPurchasableSubscription();
    const { purchaserInfo } = await Purchases.makePurchase(product.identifier);

    return isValidPurchaserInfo(purchaserInfo) ? "success" : "error";
  } catch (err) {
    if (err.userCanceled) {
      userCanceledPayment();
      return "canceled";
    }
    Sentry.captureException(err);
    return "error";
  }
};

export const restoreSubscription = async (): Promise<void> => {
  userRestoredPurchase();
  try {
    await Purchases.restoreTransactions();
  } catch (err) {
    log("Error", err);
    Sentry.captureException(err);
  }
};
