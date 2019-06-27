/**
 * The general idea with reviews is to
 * not bug people.
 *
 * We have to do reviews, because Apple
 * is a spooky-spooky overlord and
 * requires all apps to do this silly
 * dance otherwise they won't show
 * your app to anyone.
 *
 * But also holy moly are those review
 * things annoying.
 */

import * as flagstore from "../flagstore";
import * as thoughtstore from "../thoughtstore";

export async function shouldShowReview(): Promise<boolean> {
  if (await flagstore.get("has-reviewed", "false")) {
    return false;
  }

  if ((await thoughtstore.thoughtCount()) <= 3) {
    return false;
  }

  return true;
}
