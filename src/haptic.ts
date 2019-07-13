/**
 * A wrapper around Haptic that's smart enough
 * to not warn on Android
 */

import { Platform } from "react-native";
import * as Haptic from 'expo-haptics';

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
