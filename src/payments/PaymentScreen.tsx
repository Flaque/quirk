import React from "react";
import {
  View,
  Image,
  Platform,
  StatusBar,
  Linking,
  Dimensions,
} from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import { Paragraph, SubHeader, ActionButton } from "../ui";
import { CBT_FORM_SCREEN, LOCK_SCREEN } from "../screens";
import theme from "../theme";
import i18n from "../i18n";
import { BallIndicator } from "react-native-indicators";
import { FadesIn } from "../animations";
import { hasPincode } from "../lock/lockstore";
import {
  getCurrentPurchasableSubscription,
  setupRevenutCat,
  purchaseSubscription,
  isSubscribed,
  restoreSubscription,
} from "./index";
import { Product } from "../@types/purchases";
import { SplashScreen } from "expo";
import Alerter from "../alerter";
import { isLegacySubscriber } from "../payments_legacy";
import { maybeMigrateLegacySubscription } from "./legacy";

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
    subscription: Product | undefined;
    shouldShowLock: boolean;
    isLoading?: boolean;
    shouldShowAndroidApology: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    shouldShowLock: false,
    isLoading: false,
    subscription: undefined,

    // Remove after August 14th, 2019
    shouldShowAndroidApology: false,
  };

  async componentDidMount() {
    SplashScreen.preventAutoHide();
    await setupRevenutCat();

    // Remove this line after july 2020
    await maybeMigrateLegacySubscription();

    await this.refresh();
    SplashScreen.hide();
  }

  refresh = async () => {
    if (await isSubscribed()) {
      this.redirectToFormScreen();
      SplashScreen.hide();
      return;
    }

    // Remove after August 14th, 2019
    if (Platform.OS === "android" && (await isLegacySubscriber())) {
      this.setState({
        shouldShowAndroidApology: true,
      });
    }

    const subscription = await getCurrentPurchasableSubscription();
    this.setState({
      subscription,
    });
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

  onContinuePress = async () => {
    this.setState({
      isLoading: true,
    });
    const result = await purchaseSubscription();
    if (result === "success") {
      this.setState({
        isLoading: false,
        subscription: undefined,
      });
      await this.redirectToFormScreen();
    } else {
      // This else is important to not call setState after the next screen
      this.setState({
        isLoading: false,
      });
    }
  };

  onRestorePurchase = async () => {
    this.setState({
      isLoading: true,
    });
    await restoreSubscription();
    await this.refresh();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const pose = !!this.state.subscription ? "visible" : "hidden";

    return (
      <FadesIn pose={pose}>
        <Container>
          {this.state.shouldShowAndroidApology && (
            <Alerter
              alerts={[
                {
                  body: `We screwed up!
                  
Over the last two weeks, your subscription and free trial were canceled without your consent.
If you were charged and you're seeing this screen, you were refunded.

Due to our mistake, we have to ask you to resubscribe. 🙏

This happened due to a bug we caused and we're incredibly sorry. We've taken steps 
to ensure something like this never happens again. If you have any questions, please 
reach out to us at "humans@quirk.fyi"`,
                  priority: 0,
                  slug: "payment-mixup",
                  title: "We had a mixup",
                },
              ]}
            />
          )}
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
              source={require("../../assets/pinkbubble/pinkbubble.png")}
              style={{
                width: 67,
                height: 75,
                top: 10,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../../assets/icecream/icecream.png")}
              style={{
                width: 149,
                height: 344,
                top: -10,
                resizeMode: "contain",
              }}
            />
            <Image
              source={require("../../assets/yellowbobble/yellowbobble.png")}
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
                {!!this.state.subscription &&
                  this.state.subscription.price_string}
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
            {this.state.isLoading ? (
              <View
                style={{
                  height: 64,
                  width: "100%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <BallIndicator color={theme.blue} size={24} />
              </View>
            ) : (
              <>
                <ActionButton
                  flex={1}
                  title={"Get it"}
                  onPress={this.onContinuePress}
                />
                <Image
                  source={require("../../assets/paymentlooker/paymentlooker.png")}
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
                onPress={this.onRestorePurchase}
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
