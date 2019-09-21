import React from "react";
import {
  View,
  Image,
  Platform,
  StatusBar,
  Linking,
  Dimensions,
  Alert,
  AlertIOS,
} from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import { Paragraph, SubHeader, ActionButton } from "../ui";
import {
  LOCK_SCREEN,
  MAIN_SCREEN,
  CBT_ON_BOARDING_SCREEN,
  SUPPORT_SCREEN,
  MARKDOWN_ARTICLE_SCREEN,
  PAYMENT_SCREEN,
} from "../screens";
import theme from "../theme";
import i18n from "../i18n";
import { BallIndicator } from "react-native-indicators";
import { FadesIn } from "../animations";
import { hasPincode } from "../lock/lockstore";
import {
  getCurrentPurchasableSubscription,
  setupRevenutCat,
  purchaseSubscription,
  restoreSubscription,
  isSubscribed,
  alias,
} from "./index";
import { SplashScreen } from "expo";
import { isLegacySubscriber } from "../payments_legacy";
import { needsLegacyMigration, migrateLegacySubscriptions } from "./legacy";
import {
  userSawApologyNotice,
  userStartedPayment,
  userDownloaded,
} from "../stats";
import dayjs from "dayjs";
import { getIsExistingUser } from "../thoughtstore";
import { identify } from "../id";
import { passesFeatureFlag } from "../featureflags";
import intro from "../articles/content/intro";

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
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    shouldShowLock: false,
    isLoading: false,
    subscription: undefined,
  };

  async componentDidMount() {
    SplashScreen.preventAutoHide();
    await setupRevenutCat();

    // This is basically our bare-bones "login"
    await identify();
    userDownloaded();

    // Remove this line after july 2020
    if (await needsLegacyMigration()) {
      await migrateLegacySubscriptions();
    }

    await this.refresh();

    // Remove after August 14th, 2019
    if (Platform.OS === "android" && (await isLegacySubscriber())) {
      userSawApologyNotice();
      Alert.alert(
        "🤦‍ We messed up. 🤦‍",
        `Due to a bug, your subscription was canceled without your consent. If you were charged, you were refunded!
        
If you'd like to continue to use Quirk, you have to resubscribe. You won't be double charged.

If you think you're seeing this screen accidentally, click "restore purchases" to fix the issue.`
      );
    }

    SplashScreen.hide();
  }

  refresh = async () => {
    if (await isSubscribed()) {
      this.redirectToFormScreen();
      SplashScreen.hide();
      return;
    }

    if (await passesFeatureFlag("intro-before-payment-screen", 4)) {
      this.props.navigation.navigate(MARKDOWN_ARTICLE_SCREEN, {
        pages: intro.pages,
        title: intro.title,
        description: intro.description,
        nextScreen: PAYMENT_SCREEN,
        shouldHideExitButton: true,
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
      this.props.navigation.navigate(LOCK_SCREEN);
      return;
    }

    if (await getIsExistingUser()) {
      this.props.navigation.navigate(MAIN_SCREEN);
      return;
    }

    // We replace here because you shouldn't be able to go "back" to this screen
    this.props.navigation.navigate(CBT_ON_BOARDING_SCREEN);
  };

  onContinuePress = async () => {
    userStartedPayment();

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
      Alert.alert("Payment Failed", "Something went wrong, try again?");

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
            <SubHeader
              style={{
                fontSize: 28,
                marginBottom: 14,
              }}
            >
              Try Quirk free for 7 days.
            </SubHeader>
            <Paragraph
              style={{
                fontSize: 20,
                marginBottom: 28,
              }}
            >
              Cancel before{" "}
              {dayjs()
                .add(1, "week")
                .format("DD-MM-YYYY")}{" "}
              and nothing will be billed. No questions asked.
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
                  title={"Start free trial"}
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
              display: "flex",
              flexDirection: "row",
              marginLeft: 32,
              marginRight: 32,
              justifyContent: "space-between",
            }}
          >
            <Paragraph
              style={{
                fontSize: 20,
                marginBottom: 28,
              }}
            >
              {!!this.state.subscription &&
                this.state.subscription.price_string}{" "}
              per month after free trial.
            </Paragraph>
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 16,
              marginBottom: 32,
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
              justifyContent: "flex-end",
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 32,
            }}
          >
            <SubHeader
              style={{
                fontSize: 18,
              }}
            >
              What if I want to cancel?
            </SubHeader>
            <Paragraph
              style={{
                fontSize: 18,
                marginBottom: 18,
              }}
            >
              You control your subscription and cancel at anytime through the{" "}
              {Platform.OS === "ios" ? "App Store" : "Google Play Store"}.
            </Paragraph>
            <ActionButton
              flex={1}
              title={"Cancellation Instructions"}
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              width={"100%"}
              onPress={() => {
                if (Platform.OS === "android") {
                  Linking.openURL(
                    "https://support.google.com/googleplay/answer/7018481"
                  );
                } else {
                  Linking.openURL("https://support.apple.com/en-us/HT202039");
                }
              }}
            />
          </View>

          {Platform.OS === "ios" && (
            <View
              style={{
                marginBottom: 32,
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
              marginBottom: 16,
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
              title="Alias your Account"
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              onPress={() => {
                this.props.navigation.navigate(SUPPORT_SCREEN);
              }}
            />
          </View>
        </Container>
      </FadesIn>
    );
  }
}

export default PaymentScreen;
