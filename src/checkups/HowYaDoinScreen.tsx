import React from "react";
import theme from "../theme";
import { Container, MediumHeader, HintHeader, GhostButton } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, KeyboardAvoidingView } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { CHECKUP_SUMMARY_SCREEN } from "./screens";
import { newCheckup, saveCheckup } from "./checkupstore";

export default class HowYaDoinScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  onFeeling = async (felt: "good" | "neutral" | "bad") => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    const checkup = newCheckup(felt);
    await saveCheckup(checkup);

    this.props.navigation.navigate(CHECKUP_SUMMARY_SCREEN, {
      checkup,
    });
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
          <KeyboardAvoidingView
            behavior="position"
            style={{
              paddingBottom: 24,
            }}
          >
            <MediumHeader>How has it been going?</MediumHeader>
            <HintHeader
              style={{
                marginBottom: 24,
              }}
            >
              Be honest, Quirk adapts based on how you're doing.
            </HintHeader>

            <GhostButton
              title="It's going well 👍"
              width={"100%"}
              borderColor={theme.lightGray}
              textColor={theme.darkText}
              style={{
                marginBottom: 12,
                backgroundColor: "white",
              }}
              onPress={() => this.onFeeling("good")}
            />
            <GhostButton
              title="It's going okay 🤷‍"
              width={"100%"}
              borderColor={theme.lightGray}
              textColor={theme.darkText}
              style={{
                marginBottom: 12,
                backgroundColor: "white",
              }}
              onPress={() => this.onFeeling("neutral")}
            />
            <GhostButton
              title="It's going poorly 👎"
              width={"100%"}
              borderColor={theme.lightGray}
              textColor={theme.darkText}
              style={{
                marginBottom: 12,
                backgroundColor: "white",
              }}
              onPress={() => this.onFeeling("bad")}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
