import { getUserID } from "../id";
import { apiPost } from "../api";
import Sentry from "../sentry";

export default async function scheduleNotification(
  sendAfter: string,
  templateID: string
) {
  try {
    const userID = await getUserID();
    apiPost("/notification/new", {
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

export async function scheduleHappyFolksNotification(sendAfter: string) {
  try {
    const userID = await getUserID();
    await apiPost("/notification/happy/new", {
      userID,
      sendAfter,
    });
  } catch (err) {
    console.log(err);
    Sentry.captureBreadcrumb({
      message: "Attempting to schedule a followup notification",
    });
    Sentry.captureException(err);
  }
}
