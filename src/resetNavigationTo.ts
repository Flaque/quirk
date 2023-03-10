import { StackActions, NavigationActions } from "react-navigation";

export function resetNavigationTo(navigation, routeName: string) {
  const reset = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  });
  navigation.dispatch(reset);
}
