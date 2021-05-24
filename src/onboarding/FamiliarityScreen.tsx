import React from "react";
import theme from "../theme";
import { Container, MediumHeader, GhostButton } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { NOTIFICATION_SCREEN } from "./screens";
import { initSegment } from "../stats";

const Segment = initSegment();

export default class FamiliarityScreen extends React.Component<
  ScreenProps,
  {
    slugs: string[];
  }
> {
  static navigationOptions = {
    header: null,
  };

  onSelect = async (slug: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    Segment.trackWithProperties("user_recorded_familiarity", {
      familiarity: slug,
    });
    this.props.navigation.push(NOTIFICATION_SCREEN);
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
          <MediumHeader
            style={{
              marginBottom: 24,
            }}
          >
            How familiar are you with CBT?
          </MediumHeader>

          <GhostButton
            title={"Not familiar"}
            onPress={() => this.onSelect("not-familiar")}
            style={{
              marginBottom: 12,
            }}
          />
          <GhostButton
            title={"Somewhat-familiar"}
            onPress={() => this.onSelect("somewhat-familiar")}
            style={{
              marginBottom: 12,
            }}
          />
          <GhostButton
            title={"Very-familiar"}
            onPress={() => this.onSelect("very-familiar")}
            style={{
              marginBottom: 12,
            }}
          />
        </ScrollView>
      </Container>
    );
  }
}
