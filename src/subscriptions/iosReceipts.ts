import * as InAppPurchases from "react-native-iap";
import { APPLE_SHARED_SECRET } from "react-native-dotenv";

export async function getAppleExpirationDateFromReceipt(
  receipt: string
): Promise<false | number> {
  const data = await InAppPurchases.validateReceiptIos(
    {
      "receipt-data": receipt,
      password: APPLE_SHARED_SECRET, // Shared Secret
    },
    !!__DEV__ // Ask for sandbox if we're in dev
  );
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
  const receipt = purchases[0].transactionReceipt;

  return getAppleExpirationDateFromReceipt(receipt);
}
