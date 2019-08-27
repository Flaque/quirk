import React from "react";
import theme from "../theme";
import { Container, MediumHeader, HintHeader, Row, ActionButton } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, Image } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { FAMILIARITY_SCREEN, CHECKUP_PROMPT_SCREEN } from "./screens";
import { initSegment, userTurnedOnNotifications } from "../stats";
import { Platform } from "@unimodules/core";
import OneSignal from "react-native-onesignal";
import { ONESIGNAL_SECRET } from "react-native-dotenv";
import { THOUGHT_SCREEN } from "../main/screens";

const Segment = initSegment();

export default class NotificationScreen extends React.Component<
  ScreenProps,
  {
    slugs: string[];
  }
> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    OneSignal.init(ONESIGNAL_SECRET, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInFocusDisplayOption: 0,
    });
  }

  onContinue = () => {
    this.props.navigation.navigate(CHECKUP_PROMPT_SCREEN);
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <ScrollView>
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

          <MediumHeader style={{}}>
            Quirk comes with a reminder system designed to get you out of
            particularly bad periods.
          </MediumHeader>
          <HintHeader>
            For this feature to work, you'll need to turn notifications on.
          </HintHeader>

          <Row
            style={{
              marginBottom: 8,
            }}
          >
            <ActionButton
              flex={1}
              width="100%"
              title={"Turn on reminders"}
              onPress={() => {
                userTurnedOnNotifications();
                if (Platform.OS === "ios") {
                  OneSignal.registerForPushNotifications();
                }
                OneSignal.setSubscription(true);
                this.onContinue();
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
              onPress={this.onContinue}
            />
          </Row>
        </ScrollView>
      </Container>
    );
  }
}
