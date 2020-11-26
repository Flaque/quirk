import * as stats from "./stats";
import { NavigationScreenProp } from "react-navigation";

/**
 * Plug this into anything that's using screen calls
 */
export function recordScreenCallOnFocus(
  navigation: NavigationScreenProp<any, any>,
  screen: stats.ScreenType
) {
  navigation.addListener("didFocus", () => {
    stats.screen(screen);
  });
}
