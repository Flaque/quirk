import * as subscriptionStore from "./subscriptionstore";

export async function isLegacySubscriber(): Promise<boolean> {
  await subscriptionStore.storeExpirationDate(1563131545 + 100000);

  return await subscriptionStore.hasValidSubscription();
}
