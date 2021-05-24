import * as subscriptionStore from "./subscriptionstore";

export async function isLegacySubscriber(): Promise<boolean> {
  return await subscriptionStore.hasValidSubscription();
}
