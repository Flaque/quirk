import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { recordScreenCallOnFocus } from "../navigation";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../form/sizes";
import { View, Image, Linking, Alert, Platform } from "react-native";
import { Header, Container, Paragraph, ActionButton, Row } from "../ui";
import { Constants, Haptic } from "expo";
import theme from "../theme";
import haptic from "../haptic";
import * as stats from "../stats";
import { CBT_FORM_SCREEN } from "../screens";
import OneSignal from "react-native-onesignal";
import { ONESIGNAL_SECRET } from "react-native-dotenv";
import { FadesIn } from "../animations";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const RecordStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/looker/Looker.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      First, you should read this.
    </Header>
    <ActionButton
      flex={1}
      width="100%"
      title={"The Quirk Guide"}
      fillColor="#EDF0FC"
      textColor={theme.darkBlue}
      onPress={() => {
        stats.userClickedQuirkGuide();
        Linking.canOpenURL("https://quirk.fyi/explanation?ref=quirk").then(
          canOpen => {
            if (!canOpen) {
              stats.userCantOpenLink();
              Alert.alert(
                "You can't open this",
                "We're not sure why, but your phone is telling us that you can't open this link. You can find it at 'https://quirk.fyi/explanation'"
              );
            }
            Linking.openURL("https://quirk.fyi/explanation?ref=quirk");
          }
        );
      }}
    />
  </View>
);

const ChallengeStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/eater/eater.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Quirk is something you have to practice
    </Header>
    <Paragraph
      style={{
        fontSize: 20,
      }}
    >
      It takes work, but learning Quirk can help you feel a lot better.
    </Paragraph>
  </View>
);

const ChangeStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/logo/logo.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Use Quirk in the moment.
    </Header>
    <Paragraph
      style={{
        fontSize: 20,
      }}
    >
      When you're feeling anxious, angry, or depressed, use Quirk.
    </Paragraph>
  </View>
);

const RemindersStep = ({ onContinue, showPrompt }) => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/notifications/notifications.png")}
      style={{
        width: 256,
        height: 196,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
        marginBottom: 12,
      }}
    >
      {showPrompt
        ? "Before you finish, we can send you reminders if you'd like."
        : "You can control reminders in the settings screen."}
    </Header>

    {showPrompt ? (
      <>
        <Row
          style={{
            marginBottom: 8,
          }}
        >
          <ActionButton
            flex={1}
            width="100%"
            title={"Yes please!"}
            onPress={() => {
              stats.userTurnedOnNotifications();
              if (Platform.OS === "ios") {
                OneSignal.registerForPushNotifications();
              }
              OneSignal.setSubscription(true);
              onContinue();
            }}
          />
        </Row>

        <Row>
          <ActionButton
            flex={1}
            width="100%"
            title={"Continue without reminders"}
            fillColor="#EDF0FC"
            textColor={theme.darkBlue}
            onPress={onContinue}
          />
        </Row>
      </>
    ) : (
      <Row>
        <ActionButton
          flex={1}
          width="100%"
          title={"Continue"}
          onPress={() => {
            onContinue();
          }}
        />
      </Row>
    )}
  </View>
);

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    activeSlide: 0,
    showNotificationsPrompt: false,
    isReady: false,
  };

  constructor(props) {
    super(props);
    recordScreenCallOnFocus(this.props.navigation, "intro");
  }

  componentDidMount() {
    OneSignal.init(ONESIGNAL_SECRET, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInFocusDisplayOption: 0,
    });

    OneSignal.getPermissionSubscriptionState(status => {
      if (!status.hasPrompted && Platform.OS === "ios") {
        this.setState({
          showNotificationsPrompt: true,
        });
        return;
      }

      if (!status.subscriptionEnabled && Platform.OS === "android") {
        this.setState({
          showNotificationsPrompt: true,
        });
        return;
      }
    });

    // Triggers a fade in for fancy reasons
    setTimeout(() => {
      this.setState({
        isReady: true,
      });
    }, 60);
  }

  stopOnBoarding = () => {
    haptic.notification(Haptic.NotificationFeedbackType.Success);
    stats.endedOnboarding();
    this.props.navigation.replace(CBT_FORM_SCREEN, {
      fromOnboarding: true,
    });
  };

  _carousel = null;

  _renderItem = ({ item, index }) => {
    if (item.slug === "record") {
      return <RecordStep />;
    }

    if (item.slug === "challenge") {
      return <ChallengeStep />;
    }

    if (item.slug === "change") {
      return <ChangeStep />;
    }

    if (item.slug === "reminders-or-continue") {
      return (
        <RemindersStep
          onContinue={this.stopOnBoarding}
          showPrompt={this.state.showNotificationsPrompt}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <Container
        style={{
          height: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: Constants.statusBarHeight + 12,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingBottom: 0,
        }}
      >
        <FadesIn pose={this.state.isReady ? "visible" : "hidden"}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={[
              { slug: "record" },
              { slug: "challenge" },
              { slug: "change" },
              { slug: "reminders-or-continue" },
            ]}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />

          <Pagination
            dotsLength={4}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{
              margin: 0,
              padding: 0,
              backgroundColor: "transparent",
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: theme.pink,
            }}
            inactiveDotStyle={{
              backgroundColor: theme.gray,
            }}
          />
        </FadesIn>
      </Container>
    );
  }
}
