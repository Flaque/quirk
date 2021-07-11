import base64 from "react-native-base64";
import { QUIRK_API_SECRET } from "react-native-dotenv";

function api(method: string, path: string, body?: any) {
  if (!path.startsWith("/")) {
    throw new Error(
      "Expected path to start with forward slash like '/foo' instead of 'foo'"
    );
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: `basic ${base64.encode("user:" + QUIRK_API_SECRET)}`,
    },
  };

  if (method === "post") {
    options["body"] = JSON.stringify(body);
  }

  return fetch("https://api.quirk.fyi" + path, options);
}

export function apiPost(path: string, body: any) {
  return api("post", path, body);
}

export function apiGet(path: string) {
  return api("get", path);
}
