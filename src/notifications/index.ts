import { Permissions, Notifications } from "expo";
import { NOTIFICATIONS_SHARED_SECRET } from "react-native-dotenv";

const PUSH_ENDPOINT = "https://api.quirk.fyi/notifications/new";

function toBase64(value: string): string {
  return Buffer.from(value).toString("base64");
}

async function postToken(token: string) {
  return fetch(PUSH_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: toBase64("quirk:" + NOTIFICATIONS_SHARED_SECRET),
    },
    body: {
      token,
    },
  });
}

export async function registerForPushNotifications() {
  console.log("PERMISSION CHECKING");

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  console.log("PERMISSION WILL ASK");

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  console.log("PERMISSION ASKED", finalStatus);

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  console.log("CHECKING FOR TOKEN");

  // Get the token that uniquely identifies this device
  try {
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("TOKEN IS", token);

    // const response = await postToken(token);
    // console.log(response);
  } catch (err) {
    console.error(err);
  }
}
