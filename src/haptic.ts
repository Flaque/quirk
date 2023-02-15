/**
 * A wrapper around Haptic that's smart enough
 * to not warn on Android
 */

import { Platform } from "react-native";
import { Haptic } from "expo";

export default {
  notification: type => {
    if (Platform.OS !== "ios") {
      return;
    }

    Haptic.notification(type);
  },
  selection: () => {
    if (Platform.OS !== "ios") {
      return;
    }
    Haptic.selection();
  },
  impact: type => {
    if (Platform.OS !== "ios") {
      return;
    }

    Haptic.impact(type);
  },
};
