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
import {
  View,
  Image,
  Platform,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
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
import { SplashScreen } from "expo";
import * as stats from "./stats";
import { BallIndicator } from "react-native-indicators";
import Sentry from "react-native-sentry";

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
    loading: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    subscription: null,
    canMakePayments: false,
    ready: false,
    loading: false,
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
    SplashScreen.preventAutoHide();

    try {
      // If we need don't need to pay, just go to the regular app
      if (!(await requiresPayment())) {
        this.redirectToFormScreen();
        SplashScreen.hide();
        return;
      }

      const subscription = await getSubscriptionDefinition();
      this.setState({
        subscription,
        ready: true,
      });
    } catch (err) {
      Sentry.captureException(err);

      // If we mess something up, just send them through, it's cool.
      this.redirectToFormScreen();
    }
    SplashScreen.hide();
  }

  componentWillUnmount() {
    InAppPurchases.endConnection(); // Important to stop bugs on android
  }

  onContinuePress = async () => {
    stats.userStartedPayment(); // MUST happen first
    this.setState({
      loading: true,
    });

    try {
      await InAppPurchases.initConnection();
      const purchase = await InAppPurchases.buySubscription(itemSku);
      if (!purchase || !purchase.transactionReceipt) {
        throw new Error("Something went wrong subscribing, try again?");
      }

      await InAppPurchases.finishTransaction();

      // We divide by 1000 because transactionDates are in miliseconds
      // so we're EXTRA SUPER SPECIAL ACCURATE DUH
      const expirationDate = dayjs
        .unix(purchase.transactionDate / 1000)
        .add(1, "month")
        .unix();
      await storeExpirationDate(expirationDate);
      stats.userSubscribed(expirationDate);

      this.redirectToFormScreen();
    } catch (err) {
      // We don't send this error to Sentry because it's not typically an
      // error on ourside. It's typically a password failure or a network
      // error. Still, if it's happening a lot, we want to know so we can
      // fix it.
      stats.userEncounteredPaymentError(err.message);
      Alert.alert(err.message);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    if (!this.state.ready || !this.state.subscription) {
      // This only gets rendered behind a splash screen
      return <Container />;
    }

    return (
      <Container>
        <StatusBar hidden={true} />
        <Image
          source={require("../assets/payments/payments.png")}
          style={{
            width: Dimensions.get("window").width * 1.2,
            height: 600,
            resizeMode: "center",
            position: "relative",
            overflow: "visible",
            flex: 1,
            justifyContent: "center",
            left: -(Dimensions.get("window").width * 0.1),
            top: -25,
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
          {this.state.loading ? (
            <BallIndicator color={theme.blue} size={24} />
          ) : (
            <>
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
            </>
          )}
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
