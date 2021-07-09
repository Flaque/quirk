import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  ActionButton,
  Row,
  Paragraph,
  FloatingCard,
  SubHeader,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, KeyboardAvoidingView, View } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import dayjs from "dayjs";
import { get } from "lodash";
import { Checkup } from "./checkupstore";
import { THOUGHT_SCREEN } from "../main/screens";

const MoodText = ({ mood }: { mood: "good" | "bad" | "neutral" }) => {
  if (mood === "good") {
    return <Paragraph>Going well 👍</Paragraph>;
  }
  if (mood === "neutral") {
    return <Paragraph>Going okay 🤷‍</Paragraph>;
  }
  if (mood === "bad") {
    return <Paragraph>Going poorly 👎</Paragraph>;
  }
  return null;
};

export default class CheckUpSummaryScreen extends React.Component<
  ScreenProps,
  {
    checkup: Checkup;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    checkup: null,
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.navigate(THOUGHT_SCREEN);
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const checkup = get(args, "action.params.checkup");
      this.setState({
        checkup,
      });
    });
  }

  render() {
    if (!this.state.checkup) {
      return null;
    }

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
            <MediumHeader
              style={{
                marginBottom: 24,
              }}
            >
              Milestone Summary
            </MediumHeader>

            <FloatingCard>
              <View style={{ marginBottom: 24 }}>
                <SubHeader>Milestone date</SubHeader>
                <Paragraph>{dayjs().format("DD-MM-YYYY")}</Paragraph>
              </View>

              <View
                style={{
                  marginBottom: 24,
                }}
              >
                <SubHeader>How things are going</SubHeader>
                <MoodText mood={this.state.checkup.currentMood} />
              </View>

              {this.state.checkup.note && (
                <View>
                  <SubHeader>Notes</SubHeader>
                  <Paragraph>{this.state.checkup.note}</Paragraph>
                </View>
              )}
            </FloatingCard>

            <Row
              style={{
                marginTop: 24,
              }}
            >
              <ActionButton
                title={"Finish"}
                style={{
                  flex: 1,
                }}
                onPress={() => this.onNext()}
              />
            </Row>
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
