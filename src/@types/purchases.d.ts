interface PurchaserInfo {
  activeEntitlements: "undefined" | string[];
}

declare module "react-native-purchases" {
  export function setup(
    apiKey: string,
    appUserID?: string,
    observerMode?: boolean
  ): Promise<void>;

  export function setAllowSharingStoreAccount(allowSharing: boolean);

  export function setFinishTransactions(finishTransactions: boolean);

  export function addPurchaserInfoUpdateListener(
    purchaserInfoUpdateListener: Function
  );

  export function removePurchaserInfoUpdateListener(
    listenerToRemove: Function
  ): boolean;

  export function addAttributionData(
    data: any,
    network: number,
    networkUserId?: string
  );

  export function getEntitlements(): Promise<{
    [entitlement: string]: {
      [offering: string]: any; // TODO: Product object
    };
  }>;

  export function getProducts(
    productIdentifiers: string[],
    type?: "inapp" | "subs"
  ): Promise<any[]>;

  export function makePurchase(
    productIdentifier: string,
    oldSKU?: string,
    type?: "inapp" | "subs"
  ): Promise<{
    purchaserInfo: PurchaserInfo;
  }>;

  export function getPurchaserInfo(): Promise<PurchaserInfo>;

  export function restoreTransactions(): Promise<void>;

  export function getAppUserID(): Promise<string>;

  export function createAlias(newAppUserID: string): Promise<PurchaserInfo>;

  export function identify(newAppUserID: string): Promise<PurchaserInfo>;

  export function reset(): Promise<PurchaserInfo>;

  export function syncPurchases();

  export function setDebugLogsEnabled(val: boolean): Promise<void>;
}
