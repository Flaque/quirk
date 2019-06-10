/**
 * ## Guiding Principle: When in doubt, wave them through.
 *
 * Is there a bug on our side? Cool, they get in free.
 * Are they having connection issues? Cool, they get in free.
 * Problem with Apple/Google? Cool, they get in free.
 *
 * It's infinitely more important for someone to be able to
 * _use_ Quirk and record their thoughts than for us
 * to be sticklers about a couple bucks.
 */

import React from "react";
import { View, Image, Platform, Alert } from "react-native";
import { recordScreenCallOnFocus } from "./navigation";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { Constants } from "expo";
import { Paragraph, SubHeader, ActionButton } from "./ui";
import * as InAppPurchases from "react-native-iap";
import { CBT_FORM_SCREEN } from "./screens";
import { requiresPayment, getSubscriptionDefinition } from "./subscriptions";

const IOS_SKU = "fyi.quirk.subscription";
const itemSku = Platform.select({
  ios: IOS_SKU,
});

const Container = props => (
  <View
    style={{
      marginTop: Constants.statusBarHeight,
      paddingTop: 24,
      height: "100%",
      backgroundColor: "white",
    }}
  >
    {props.children || null}
  </View>
);

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

class PaymentScreen extends React.Component<
  Props,
  {
    subscription?: InAppPurchases.Product<string>;
    canMakePayments: boolean;
    ready: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    subscription: null,
    canMakePayments: false,
    ready: false,
  };

  constructor(props) {
    super(props);
    recordScreenCallOnFocus(this.props.navigation, "payments");
  }

  redirectToFormScreen() {
    // We replace here because you shouldn't be able to go "back" to this screen
    this.props.navigation.replace(CBT_FORM_SCREEN, {
      thought: false,
    });
  }

  async componentDidMount() {
    // If we need don't need to pay, just go to the regular app
    if (!(await requiresPayment())) {
      this.redirectToFormScreen();
    }

    const subscription = await getSubscriptionDefinition();
    this.setState({
      subscription,
      ready: true,
    });
  }

  componentWillUnmount() {
    InAppPurchases.endConnection(); // Important to stop bugs on android
  }

  async onContinuePress() {
    try {
      await InAppPurchases.initConnection();
      const purchase = await InAppPurchases.buySubscription(itemSku);
      if (!purchase || !purchase.transactionReceipt) {
        throw new Error("Something went wrong subscribing, try again?");
      }

      await InAppPurchases.finishTransaction();
    } catch (err) {
      // TODO capture error
      Alert.alert(err.message);
    }
  }

  render() {
    // TODO(evan): Add better loading screen here
    if (!this.state.ready || !this.state.subscription) {
      return <Container />;
    }

    return (
      <Container>
        <Image
          source={require("../assets/awetop/awetop.png")}
          style={{
            flex: 1,
            width: 180,
            height: 180,
            resizeMode: "contain",
            marginBottom: 32,
            position: "absolute",
            top: -100,
            left: -50,
          }}
        />
        <Image
          source={require("../assets/awebottom/awebottom.png")}
          style={{
            flex: 1,
            width: 400,
            height: 400,
            resizeMode: "contain",
            marginBottom: 32,
            position: "absolute",
            bottom: -80,
            right: -200,
          }}
        />

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            margin: 48,
          }}
        >
          <Paragraph
            style={{
              fontSize: 28,
              marginBottom: 28,
            }}
          >
            ❤️ Support{" "}
            <SubHeader
              style={{
                fontSize: 28,
              }}
            >
              quirk
            </SubHeader>{" "}
            for{" "}
            <SubHeader
              style={{
                fontSize: 28,
              }}
            >
              {this.state.subscription.localizedPrice}
            </SubHeader>{" "}
            a month.
          </Paragraph>

          <ActionButton title={"Continue"} onPress={this.onContinuePress} />
        </View>
      </Container>
    );
  }
}

export default PaymentScreen;
