import React from "react";
import theme from "../theme";
import { Container, MediumHeader, SubHeader, HintHeader } from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { TouchableCardContainer, CardCrown } from "../card/TouchableCard";
import { CHECKUP_PROMPT_SCREEN, PREDICTION_PROMPT_SCREEN } from "./screens";
import { initSegment } from "../stats";

const Segment = initSegment();

const CardButton = ({ onPress, crown, title, description }) => (
  <TouchableCardContainer onPress={onPress}>
    <CardCrown text={crown} featherIconName="cloud" />
    <View
      style={{
        padding: 12,
        flex: 1,
      }}
    >
      <SubHeader
        style={{
          fontSize: 16,
        }}
      >
        {title}
      </SubHeader>
      <HintHeader
        style={{
          fontSize: 14,
          marginBottom: 0,
        }}
      >
        {description}
      </HintHeader>
    </View>
  </TouchableCardContainer>
);

export default class AnxietyCheckScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  onSelect = async (type: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    Segment.trackWithProperties("user_selected_onboarding_anxiety", {
      type,
    });
    this.props.navigation.push(PREDICTION_PROMPT_SCREEN, {
      type,
    });
  };

  onSkip = async () => {
    Segment.track("user_dismissed_onboarding_anxiety");
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
          <MediumHeader
            style={{
              marginBottom: 24,
            }}
          >
            Do any of these sound familiar?
          </MediumHeader>

          <CardButton
            title="I'm currently worried about the outcome of something that just happened."
            description="Like a mistake made or the results of a test."
            crown={"OUTCOMES"}
            onPress={() => this.onSelect("outcome")}
          />

          <CardButton
            title="I'm currently anxious about something I'm about to do."
            description="Like going to the dentist, flying on a plane, or interviewing for a job."
            crown={"FORTUNE TELLING"}
            onPress={() => this.onSelect("fortune_telling")}
          />

          <CardButton
            title="I'm currently putting off a healthy behavior."
            description="Like exercising, seeing friends, or studying for a test."
            crown={"PROCRASTINATION"}
            onPress={() => this.onSelect("procrastination")}
          />

          <TouchableCardContainer onPress={this.onSkip}>
            <View
              style={{
                padding: 12,
                flex: 1,
              }}
            >
              <SubHeader
                style={{
                  fontSize: 16,
                  marginBottom: 0,
                }}
              >
                {"None of these."}
              </SubHeader>
            </View>
          </TouchableCardContainer>
        </ScrollView>
      </Container>
    );
  }
}
