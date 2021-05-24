import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";

export default interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}
