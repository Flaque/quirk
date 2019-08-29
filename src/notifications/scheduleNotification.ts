import { getUserID } from "../id";
import { post } from "../api";
import Sentry from "../sentry";

export default async function scheduleNotification(
  sendAfter: string,
  templateID: string
) {
  try {
    const userID = await getUserID();
    post("/notification/new", {
      userID,
      sendAfter,
      templateID,
    });
  } catch (err) {
    Sentry.captureBreadcrumb({
      message: "Attempting to schedule a followup notification",
    });
    Sentry.captureException(err);
  }
}
