import React from "react";
import { ScrollView, StatusBar, Platform } from "react-native";
import theme from "./theme";
import { Linking } from "expo";
import Constants from "expo-constants";
import {
  Row,
  Container,
  SubHeader,
  Paragraph,
  RoundedSelectorButton,
  B,
  ActionButton,
} from "./ui";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { CBT_ON_BOARDING_SCREEN, LOCK_SCREEN } from "./screens";
import { setSetting, getSettingOrSetDefault } from "./setting/settingstore";
import {
  HISTORY_BUTTON_LABEL_KEY,
  HISTORY_BUTTON_LABEL_DEFAULT,
  HistoryButtonLabelSetting,
  isHistoryButtonLabelSetting,
} from "./setting";
import { recordScreenCallOnFocus } from "./navigation";
import { isGrandfatheredIntoFreeSubscription } from "./history/grandfatherstore";
import OneSignal from "react-native-onesignal";
import { ONESIGNAL_SECRET } from "react-native-dotenv";
import * as stats from "./stats";
import { FadesIn } from "./animations";
import { latestExpirationDate } from "./payments";
import dayjs from "dayjs";
import { hasPincode, removePincode } from "./lock/lockstore";

export { HistoryButtonLabelSetting };

// Exportable settings
export async function getHistoryButtonLabel(): Promise<
  HistoryButtonLabelSetting
> {
  const value = await getSettingOrSetDefault(
    HISTORY_BUTTON_LABEL_KEY,
    HISTORY_BUTTON_LABEL_DEFAULT
  );

  if (!isHistoryButtonLabelSetting(value)) {
    console.error(
      `Something went wrong getting ${HISTORY_BUTTON_LABEL_KEY}. Got: "${value}"`
    );
    return HISTORY_BUTTON_LABEL_DEFAULT;
  }

  return value;
}

const Feedback = () => (
  <>
    <SubHeader>*feedback</SubHeader>
    <Paragraph
      style={{
        marginBottom: 16,
      }}
    >
      We take your feedback extremely seriously. The email below goes directly
      to the creators of Quirk.
    </Paragraph>
    <ActionButton
      flex={1}
      title={"Email Feedback"}
      fillColor="#EDF0FC"
      textColor={theme.darkBlue}
      style={{
        borderWidth: 0,
        borderBottomWidth: 0,
      }}
      width={"100%"}
      onPress={() => {
        Linking.openURL(
          "mailto:humans@quirk.fyi?subject=" + encodeURI("Quirk Feedback")
        );
      }}
    />
  </>
);

const CancelationInstructions = () => {
  return (
    <ActionButton
      flex={1}
      title={"Cancellation Instructions"}
      fillColor="#EDF0FC"
      textColor={theme.darkBlue}
      style={{
        borderWidth: 0,
        borderBottomWidth: 0,
      }}
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
  );
};

const GrandfatheredInFreeQuirk = () => (
  <>
    <Paragraph
      style={{
        marginBottom: 4,
      }}
    >
      <B>You've been given Quirk for free! 🙌</B>
    </Paragraph>
    <Paragraph
      style={{
        marginBottom: 49,
      }}
    >
      This will go away if you uninstall the app. Feel free to reach out by
      email ({"ejc" + "@" + "quirk.fyi"}) if you get a new phone; we'll work
      something out. Thanks for being an early supporter! ❤️
    </Paragraph>
  </>
);

const SubscriptionExpirationDate = ({ expirationDate }) => (
  <>
    <Row>
      <Paragraph
        style={{
          marginBottom: 16,
        }}
      >
        Thanks for supporting the development of Quirk!
      </Paragraph>
    </Row>
    <Row
      style={{
        marginBottom: 16,
      }}
    >
      <Paragraph>
        You're currently subscribed. On{" "}
        <B>{dayjs(expirationDate).format("YYYY-MM-DD")}</B> your subscription
        will renew.
      </Paragraph>
    </Row>

    <Row
      style={{
        marginBottom: 16,
      }}
    >
      <CancelationInstructions />
    </Row>
  </>
);

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface State {
  isReady: boolean;
  historyButtonLabel?: HistoryButtonLabelSetting;
  isGrandfatheredIntoSubscription?: boolean;
  subscriptionExpirationDate?: string;
  areNotificationsOn?: boolean;
  shouldShowRemovePincode?: boolean;
}

class SettingScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isGrandfatheredIntoSubscription: false,
      areNotificationsOn: false,
      shouldShowRemovePincode: false,
    };
    recordScreenCallOnFocus(this.props.navigation, "settings");
  }

  async componentDidMount() {
    OneSignal.init(ONESIGNAL_SECRET, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInFocusDisplayOption: 0,
    });
    await this.refresh();
  }

  refresh = async () => {
    const historyButtonLabel = await getHistoryButtonLabel();
    const shouldShowRemovePincode = await hasPincode();
    this.setState({
      historyButtonLabel,
      shouldShowRemovePincode,
    });

    // Check subscription status
    if (await isGrandfatheredIntoFreeSubscription()) {
      this.setState({
        isGrandfatheredIntoSubscription: true,
      });
    } else {
      const expDate = await latestExpirationDate();
      this.setState({
        subscriptionExpirationDate: expDate,
      });
    }

    // Check notification status
    OneSignal.getPermissionSubscriptionState(status => {
      this.setState({
        areNotificationsOn: !!status.subscriptionEnabled,
        isReady: true,
      });
    });
  };

  navigateToList = () => {
    this.props.navigation.pop();
  };

  navigateToOnboardingScreen = () => {
    this.props.navigation.navigate(CBT_ON_BOARDING_SCREEN);
  };

  toggleHistoryButtonLabels = () => {
    if (!this.state.isReady) {
      this.refresh();
      return;
    }

    if (this.state.historyButtonLabel === "alternative-thought") {
      setSetting<HistoryButtonLabelSetting>(
        HISTORY_BUTTON_LABEL_KEY,
        "automatic-thought"
      );
      this.refresh();
    } else {
      setSetting<HistoryButtonLabelSetting>(
        HISTORY_BUTTON_LABEL_KEY,
        "alternative-thought"
      );
      this.refresh();
    }
  };

  render() {
    const { isReady } = this.state;

    return (
      <FadesIn
        style={{ backgroundColor: theme.lightOffwhite }}
        pose={isReady ? "visible" : "hidden"}
      >
        <ScrollView
          style={{
            backgroundColor: theme.lightOffwhite,
            marginTop: Constants.statusBarHeight + 24,
            paddingTop: 24,
            height: "100%",
          }}
        >
          <Container
            style={{
              paddingBottom: 128,
            }}
          >
            <StatusBar barStyle="dark-content" hidden={false} />
            <Row
              style={{
                marginBottom: 22,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SubHeader>*reminders</SubHeader>
              <Paragraph
                style={{
                  marginBottom: 16,
                }}
              >
                If you'd like, you can turn on notification reminders that help
                you build up the habit of challenging thoughts.
              </Paragraph>
              <RoundedSelectorButton
                title={"Please remind me"}
                selected={this.state.areNotificationsOn}
                onPress={() => {
                  if (Platform.OS === "ios") {
                    OneSignal.registerForPushNotifications();
                  }
                  OneSignal.setSubscription(true);
                  this.setState({
                    areNotificationsOn: true,
                  });
                  stats.userTurnedOnNotifications();
                }}
              />

              <RoundedSelectorButton
                title={"No reminders, thanks"}
                selected={!this.state.areNotificationsOn}
                onPress={() => {
                  OneSignal.setSubscription(false);
                  this.setState({
                    areNotificationsOn: false,
                  });
                  stats.userTurnedOffNotifications();
                }}
              />
            </Row>

            <Row
              style={{
                marginBottom: 22,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SubHeader>*pincode lock 🔒</SubHeader>
              <Paragraph
                style={{
                  marginBottom: 16,
                }}
              >
                You can lock the app with a pincode if you'd like. Be warned
                that the only way to reset the code is to contact support (which
                can take awhile), so be careful not to forget.
              </Paragraph>
              <ActionButton
                flex={1}
                title={
                  this.state.shouldShowRemovePincode
                    ? "Reset Pincode"
                    : "Set Pincode"
                }
                width={"100%"}
                fillColor="#EDF0FC"
                textColor={theme.darkBlue}
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 0,
                }}
                onPress={() => {
                  this.props.navigation.navigate(LOCK_SCREEN, {
                    isSettingCode: true,
                  });
                  this.setState({
                    shouldShowRemovePincode: true,
                  });
                }}
              />
              {this.state.shouldShowRemovePincode && (
                <ActionButton
                  flex={1}
                  title={"Remove Pincode"}
                  width={"100%"}
                  fillColor="#EDF0FC"
                  textColor={theme.darkBlue}
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    marginTop: 6,
                  }}
                  onPress={async () => {
                    await removePincode();
                    this.setState({
                      shouldShowRemovePincode: false,
                    });
                  }}
                />
              )}
            </Row>

            <Row
              style={{
                marginBottom: 22,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Feedback />
            </Row>

            <Row
              style={{
                marginBottom: 22,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SubHeader>*subscription</SubHeader>
              {this.state.isGrandfatheredIntoSubscription ? (
                <GrandfatheredInFreeQuirk />
              ) : (
                <SubscriptionExpirationDate
                  expirationDate={this.state.subscriptionExpirationDate}
                />
              )}
            </Row>
          </Container>
        </ScrollView>
      </FadesIn>
    );
  }
}

export default SettingScreen;
