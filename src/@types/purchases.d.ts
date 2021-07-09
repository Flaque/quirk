interface PurchaserInfo {
  activeEntitlements: "undefined" | string[];
  activeSubscriptions: string[];
  allExpirationDates: {
    [subscription: string]: string;
  };
  expirationsForActiveEntitlements: {
    [entitlement: string]: string;
  };
  purchaseDatesForActiveEntitlements: {
    [entitlement: string]: string;
  };
  allPurchasedProductIdentifiers: string[];
  latestExpirationDate: string;
}

interface Product {
  currency_code: string;
  description: string;
  identifier: string;
  intro_price: string;
  intro_price_cycles: string;
  intro_price_period: string;
  intro_price_string: string;
  price: number;
  price_string: string;
  title: string;
}

declare module "react-native-purchases" {
  export function setup(
    apiKey: string,
    appUserID?: string,
    observerMode?: boolean
  ): Promise<void>;

  let automaticAppleSearchAdsAttributionCollection: boolean;

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
      [offering: string]: Product;
    };
  }>;

  export function getProducts(
    productIdentifiers: string[],
    type?: "inapp" | "subs"
  ): Promise<Product[]>;

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
