import Purchases from "react-native-purchases";
import { REVENUECAT_API_KEY } from "react-native-dotenv";
import { userCanceledPayment } from "../stats";
import Sentry from "../sentry";

// All entitlements that have ever existed that provide
// a user with entrance into Quirk
const ALL_SUBSCRIPTION_ENTITLEMENTS = ["monthly", "reduced"];

// The current entitlement we're selling to folks
// TODO: A/B tests, deals, and other price changes can go here
const getMainSubscriptionEntitlement = () => {
  return "monthly";
};

const isValidPurchaserInfo = (info: PurchaserInfo) => {
  if (info.activeEntitlements === "undefined") {
    return false;
  }

  return info.activeEntitlements.some(ent => {
    ALL_SUBSCRIPTION_ENTITLEMENTS.includes(ent);
  });
};

// Should be called once, likely on componentDidMount
export const setupRevenutCat = async () => {
  Purchases.setDebugLogsEnabled(!!__DEV__);
  Purchases.setup(REVENUECAT_API_KEY);
};

// Note that subscriptions can change prices or structure all the time.
export const getCurrentSubscription = async () => {
  return Purchases.getEntitlements();
};

export const isSubscribed = async () => {
  const purchaserInfo = await Purchases.getPurchaserInfo();
  return isValidPurchaserInfo(purchaserInfo);
};

/**
 * Attempts to purchase a subscription,
 */
export const purchaseSubscription = async (): Promise<
  "error" | "canceled" | "success"
> => {
  try {
    const { purchaserInfo } = await Purchases.makePurchase(
      getMainSubscriptionEntitlement()
    );

    if (purchaserInfo.activeEntitlements === "undefined") {
      return "error";
    }

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
