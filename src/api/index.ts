import base64 from "react-native-base64";
import { QUIRK_API_SECRET } from "react-native-dotenv";

export function post(path: string, body: any) {
  if (!path.startsWith("/")) {
    throw new Error(
      "Expected path to start with forward slash like '/foo' instead of 'foo'"
    );
  }

  return fetch("https://api.quirk.fyi" + path, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `basic ${base64.encode("user:" + QUIRK_API_SECRET)}`,
    },
    body: JSON.stringify(body),
  });
}
