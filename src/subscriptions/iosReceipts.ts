import * as InAppPurchases from "react-native-iap";
import { APPLE_SHARED_SECRET } from "react-native-dotenv";

const CODE_PRODUCTION_SANDBOX_MODE = 21007;

export async function getAppleExpirationDateFromReceipt(
  receipt: string
): Promise<false | number> {
  let data = await InAppPurchases.validateReceiptIos(
    {
      "receipt-data": receipt,
      password: APPLE_SHARED_SECRET, // Shared Secret
    },
    !!__DEV__ // Ask for sandbox if we're in dev
  );
  if (!data) {
    return false;
  }

  /**
   * Apple's reviewers test in sandbox mode, so
   * if we find ourselves in a build that SHOULD
   * be production, but Apple's servers are
   * "helpfully" returning a 21007, (thank you apple you're the best and totally not the bane of my entire existance)
   * then we'll just try again in sandbox mode.
   *
   * everything is fine. This is fine.
   */
  if (data.status === CODE_PRODUCTION_SANDBOX_MODE) {
    data = await InAppPurchases.validateReceiptIos(
      {
        "receipt-data": receipt,
        password: APPLE_SHARED_SECRET, // Shared Secret
      },
      true
    );
  }
  if (!data) {
    return false;
  }

  /* Looks like:
      [
        Object {
          "expires_date": "2019-06-20 14:59:28 Etc/GMT",
          "expires_date_ms": "1561042768000",
          "expires_date_pst": "2019-06-20 07:59:28 America/Los_Angeles",
          "is_in_intro_offer_period": "false",
          "is_trial_period": "false",
          "original_purchase_date": "2019-06-20 14:53:38 Etc/GMT",
          "original_purchase_date_ms": "1561042418000",
          "original_purchase_date_pst": "2019-06-20 07:53:38 America/Los_Angeles",
          "original_transaction_id": "1000000537471812",
          "product_id": "fyi.quirk.subscription",
          "purchase_date": "2019-06-20 14:54:28 Etc/GMT",
          "purchase_date_ms": "1561042468000",
          "purchase_date_pst": "2019-06-20 07:54:28 America/Los_Angeles",
          "quantity": "1",
          "transaction_id": "1000000539096098",
          "web_order_line_item_id": "1000000045127751",
        },
        // ...
      ]
     */
  const pastPayments = data.latest_receipt_info as Array<{
    expires_date_ms: string;
  }>;

  const latestExpirationDate = pastPayments
    .map(({ expires_date_ms }) => parseInt(expires_date_ms) / 1000)
    .sort()
    .reverse()[0];

  return latestExpirationDate;
}

export async function getAppleExpirationDateFromRecentPurchases(): Promise<
  false | number
> {
  const purchases = (await InAppPurchases.getAvailablePurchases()) || [];
  if (!purchases || purchases.length === 0) {
    return false;
  }

  const receipt = purchases[0].transactionReceipt;
  return getAppleExpirationDateFromReceipt(receipt);
}
