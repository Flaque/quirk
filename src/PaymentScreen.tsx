/**
 * ## Guiding Principle: When in doubt, wave them through.
 *
 * Is there a bug on our side? Cool, they get in free.
 * Are they having connection issues? Cool, they get in free.
 * Problem with Apple/Google? Cool, they get in free.
 *
 * It's infinitely more important for someone to be able to
 * USE Quirk and record their thoughts than for us
 * to be sticklers about a couple bucks.
 */

import React from "react";
import { View, Image, Platform, Alert, StatusBar } from "react-native";
import { recordScreenCallOnFocus } from "./navigation";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import { Paragraph, SubHeader, ActionButton } from "./ui";
import * as InAppPurchases from "react-native-iap";
import { CBT_FORM_SCREEN } from "./screens";
import { getSubscriptionDefinition, requiresPayment } from "./subscriptions";
import theme from "./theme";
import i18n from "./i18n";
import { storeExpirationDate } from "./subscriptions/subscriptionstore";
import dayjs from "dayjs";

const IOS_SKU = "fyi.quirk.subscription";
const itemSku = Platform.select({
  ios: IOS_SKU,
});

const Container = props => (
  <ScrollView
    style={{
      height: "100%",
      backgroundColor: "white",
    }}
  >
    {props.children || null}
  </ScrollView>
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

      // We divide by 1000 because transactionDates are in miliseconds
      // so we're EXTRA SUPER SPECIAL ACCURATE DUH
      storeExpirationDate(dayjs.unix(purchase.transactionDate / 1000).unix());

      this.redirectToFormScreen();
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
        <StatusBar hidden={true} />
        <Image
          source={require("../assets/payments/payments.png")}
          style={{
            width: "110%",
            height: 500,
            resizeMode: "center",
            position: "relative",
            top: -25,
            left: -20,
            flex: 1,
            justifyContent: "center",
            marginBottom: 12,
          }}
        />

        <View
          style={{
            justifyContent: "flex-start",
            marginLeft: 32,
            marginRight: 32,
          }}
        >
          <Paragraph
            style={{
              fontSize: 28,
              marginBottom: 28,
            }}
          >
            Support{" "}
            <SubHeader
              style={{
                fontSize: 28,
                fontWeight: "900",
              }}
            >
              quirk
            </SubHeader>{" "}
            for{" "}
            <SubHeader
              style={{
                fontSize: 28,
                fontWeight: "900",
              }}
            >
              {this.state.subscription.localizedPrice}
            </SubHeader>{" "}
            a month.
          </Paragraph>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 32,
            marginRight: 32,
            justifyContent: "space-between",
          }}
        >
          <ActionButton
            flex={1}
            title={"Continue"}
            onPress={this.onContinuePress}
          />
          <Image
            source={require("../assets/paymentlooker/paymentlooker.png")}
            style={{
              height: 64,
              width: 64,
              position: "relative",
              top: -10,
              resizeMode: "contain",
              marginLeft: 24,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 24,
            marginBottom: 24,
            marginLeft: 32,
            marginRight: 32,
          }}
        >
          <Paragraph
            style={{
              color: theme.lightText,
            }}
          >
            {i18n.t("payment.ios_explanation")}
          </Paragraph>
        </View>
      </Container>
    );
  }
}

export default PaymentScreen;
