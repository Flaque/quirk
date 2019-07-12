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
 *
 * ## !! HEY YOU IN THE FUTURE !!
 *
 * Look payments are an awful nightmare fueled hellscape.
 * Much of this code isn't great and probably isn't the
 * "right" way to do it.
 *
 * Apple is awful. Google is awful. They're all bad.
 *
 * If you're looking at this in the future as an example
 * of how to setup payments for your own app, just
 * go use Revenuecat. They're pretty cool I hear,
 * and if you can actual get them to work, they're
 * amazing.
 */

import React from "react";
import {
  View,
  Image,
  Platform,
  Alert,
  StatusBar,
  Linking,
  Dimensions,
  EmitterSubscription,
} from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import { Paragraph, SubHeader, ActionButton } from "./ui";
import * as InAppPurchases from "react-native-iap";
import { CBT_FORM_SCREEN, LOCK_SCREEN } from "./screens";
import {
  getSubscriptionDefinition,
  requiresPayment,
  isProbablyFreshlyInstalledApp,
} from "./subscriptions";
import theme from "./theme";
import i18n from "./i18n";
import { storeExpirationDate } from "./subscriptions/subscriptionstore";
import dayjs from "dayjs";
import { SplashScreen } from "expo";
import * as stats from "./stats";
import { BallIndicator } from "react-native-indicators";
import { getAppleExpirationDateFromReceipt } from "./subscriptions/iosReceipts";
import { isGrandfatheredIntoFreeSubscription } from "./history/grandfatherstore";
import Sentry from "./sentry";
import { FadesIn } from "./animations";
import { hasPincode } from "./lock/lockstore";

const IOS_SKU = "fyi.quirk.subscription";
const ANDROID_ID = "basic_subscription";
const subscriptionSku = Platform.select({
  ios: IOS_SKU,
  android: ANDROID_ID,
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

const isIPad = () => {
  const { height, width } = Dimensions.get("window");
  return Platform.OS === "ios" && height / width < 1.6;
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

class PaymentScreen extends React.Component<
  Props,
  {
    subscription?: InAppPurchases.Subscription<string>;
    canMakePayments: boolean;
    isReady: boolean;
    loading: boolean;
    shouldShowLock: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    shouldShowLock: false,
    subscription: null,
    canMakePayments: false,
    isReady: false,
    loading: false,
  };

  redirectToFormScreen = async () => {
    // If we're locked, go to the lock instead
    // Check if we should show a pincode
    const isLocked = await hasPincode();
    if (isLocked) {
      this.props.navigation.replace(LOCK_SCREEN);
      return;
    }

    // We replace here because you shouldn't be able to go "back" to this screen
    this.props.navigation.replace(CBT_FORM_SCREEN, {
      thought: false,
    });
  };

  fetchSubscriptionDefinition = async () => {
    const subscription = await getSubscriptionDefinition();
    await this.setState({
      subscription,
    });
  };

  showPaymentsScreen = async () => {
    stats.screen("payments");
    await this.fetchSubscriptionDefinition();
    this.setState({
      isReady: true,
    });
    SplashScreen.hide();
  };

  storePurchase = async (sub: InAppPurchases.SubscriptionPurchase) => {
    let expirationDate;

    /** iOS **/
    if (Platform.OS === "ios") {
      expirationDate = await getAppleExpirationDateFromReceipt(
        sub.transactionReceipt
      );
      if (!expirationDate) {
        throw new Error(
          "Something went wrong validating your receipt, try again?"
        );
      }
    } else {
      /** Android **/

      // We divide by 1000 because transactionDates are in miliseconds
      // so we're EXTRA SUPER SPECIAL ACCURATE DUH
      expirationDate = dayjs
        .unix(sub.transactionDate / 1000)
        .add(1, "month")
        .unix();
    }

    await storeExpirationDate(expirationDate);
    stats.userSubscribed(expirationDate);
    this.redirectToFormScreen();

    this.setState({
      loading: false,
    });
  };

  // See: https://github.com/dooboolab/react-native-iap#purchase
  purchaseUpdateSubscription: EmitterSubscription;
  purchaseErrorSubscription: EmitterSubscription;

  async componentDidMount() {
    SplashScreen.preventAutoHide();

    this.purchaseUpdateSubscription = InAppPurchases.purchaseUpdatedListener(
      (purchase: InAppPurchases.SubscriptionPurchase) => {
        this.storePurchase(purchase);
      }
    );
    this.purchaseErrorSubscription = InAppPurchases.purchaseErrorListener(
      (error: InAppPurchases.PurchaseError) => {
        if (
          error.debugMessage ===
          "Billing is unavailable. This may be a problem with your device, or the Play Store may be down."
        ) {
          Alert.alert("Can't connect. Are you logged into the Play Store?");
          stats.log("Android Billing Error", { error });
          return;
        }

        stats.log("purchaseErrorListener", { error });
      }
    );

    try {
      if (await isGrandfatheredIntoFreeSubscription()) {
        stats.subscriptionVerified("grandfathered");
        this.redirectToFormScreen();
        SplashScreen.hide();
        return;
      }

      // New apps don't need to spend time checking payments,
      // let's just get to it asap
      if (await isProbablyFreshlyInstalledApp()) {
        await this.showPaymentsScreen();
        return;
      }

      // If we need don't need to pay, just go to the regular app
      if (!(await requiresPayment())) {
        this.redirectToFormScreen();
        SplashScreen.hide();
        return;
      }
    } catch (err) {
      stats.subscriptionGivenForFreeDueToError();
      Sentry.captureException(err);

      // If we mess something up, just send them through, it's cool.
      this.redirectToFormScreen();
      SplashScreen.hide();
    }

    await this.showPaymentsScreen();
  }

  componentWillMount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  componentWillUnmount() {
    InAppPurchases.endConnectionAndroid(); // Important to stop bugs on android
  }

  restorePurchases = async () => {
    this.setState({
      loading: true,
    });

    // If we need don't need to pay, just go to the regular app
    if (!(await requiresPayment())) {
      this.redirectToFormScreen();
      return;
    }

    Alert.alert("No active subscription found");
    this.setState({
      loading: false,
    });
  };

  onContinuePress = async () => {
    stats.userStartedPayment(); // MUST happen first
    this.setState({
      loading: true,
    });

    try {
      await InAppPurchases.initConnection();

      await InAppPurchases.requestSubscription(subscriptionSku);
    } catch (err) {
      console.error(err);
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
    if (!this.state.subscription) {
      return <Container />;
    }

    const pose = this.state.isReady ? "visible" : "hidden";

    return (
      <FadesIn pose={pose}>
        <Container>
          <StatusBar hidden={true} />

          {!isIPad() && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: Dimensions.get("screen").height / 2.5,
                backgroundColor: "#FDF1F5",
              }}
            />
          )}

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "row",
              padding: 24,
              marginTop: 48,
            }}
          >
            <Image
              source={require("../assets/pinkbubble/pinkbubble.png")}
              style={{
                width: 67,
                height: 75,
                top: 10,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../assets/icecream/icecream.png")}
              style={{
                width: 149,
                height: 344,
                top: -10,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../assets/yellowbobble/yellowbobble.png")}
              style={{
                width: 67,
                height: 75,
                top: 10,
                resizeMode: "contain",
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
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
              a month. Try for free for 7 days.
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
                  title={"Get it"}
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
              justifyContent: "flex-end",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 32,
            }}
          >
            <SubHeader
              style={{
                fontSize: 18,
              }}
            >
              Why get quirk?
            </SubHeader>
            <Paragraph
              style={{
                fontSize: 18,
                marginBottom: 18,
              }}
            >
              "It reigns supreme in the mental health app world" - Quirk user
            </Paragraph>
            <Paragraph
              style={{
                fontSize: 18,
                marginBottom: 18,
              }}
            >
              "Super simple and easy to use, yet REALLY well considered." -
              Quirk user
            </Paragraph>

            <Paragraph
              style={{
                fontSize: 18,
                marginBottom: 18,
              }}
            >
              "This is a gem, a real gem." - Quirk user
            </Paragraph>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 16,
              marginTop: 32,
              justifyContent: "space-between",
            }}
          >
            {this.state.loading ? (
              <BallIndicator color={theme.blue} size={24} />
            ) : (
              <ActionButton
                flex={1}
                title={"Restore Purchases"}
                fillColor="#EDF0FC"
                textColor={theme.darkBlue}
                onPress={this.restorePurchases}
              />
            )}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 16,
              justifyContent: "space-between",
            }}
          >
            <ActionButton
              flex={1}
              title={"Privacy Policy"}
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              onPress={() => {
                Linking.canOpenURL("https://quirk.fyi/privacy").then(() =>
                  Linking.openURL("https://quirk.fyi/privacy")
                );
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 32,
              justifyContent: "space-between",
            }}
          >
            <ActionButton
              flex={1}
              title={"Terms of Service"}
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              onPress={() => {
                Linking.canOpenURL("https://quirk.fyi/tos").then(() =>
                  Linking.openURL("https://quirk.fyi/tos")
                );
              }}
            />
          </View>

          {Platform.OS === "ios" && (
            <View
              style={{
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
          )}
        </Container>
      </FadesIn>
    );
  }
}

export default PaymentScreen;
