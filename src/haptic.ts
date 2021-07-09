/**
 * A wrapper around Haptic that's smart enough
 * to not warn on Android
 */

import { Platform } from "react-native";
import * as Haptic from "expo-haptics";

export default {
  notification: (type: Haptic.NotificationFeedbackType) => {
    if (Platform.OS !== "ios") {
      return;
    }

    Haptic.notificationAsync(type);
  },
  selection: () => {
    if (Platform.OS !== "ios") {
      return;
    }
    Haptic.selectionAsync();
  },
  impact: (type: Haptic.ImpactFeedbackStyle) => {
    if (Platform.OS !== "ios") {
      return;
    }

    Haptic.impactAsync(type);
  },
};
