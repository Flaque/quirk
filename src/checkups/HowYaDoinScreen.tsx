import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  HintHeader,
  RoundedSelectorButton,
  SubHeader,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import {
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import {
  newCheckup,
  saveCheckup,
  Checkup,
  saveNextCheckupDate,
} from "./checkupstore";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import { get } from "lodash";
import { MAIN_SCREEN } from "../screens";
import dayjs from "dayjs";

export default class HowYaDoinScreen extends React.Component<
  ScreenProps,
  {
    checkup: Checkup | null;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    checkup: newCheckup(),
  };

  refresh = args => {
    const checkup = get(args, "action.params.checkup");
    if (checkup) {
      this.setState({
        checkup,
      });
    }
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.refresh);
    this.props.navigation.addListener("didFocus", this.refresh);
  }

  onNext = async () => {
    if (this.state.checkup.currentMood === "unselected") {
      return;
    }
    haptic.notification(Haptic.NotificationFeedbackType.Success);
    await saveCheckup(this.state.checkup);

    const nextCheckupDate = dayjs()
      .add(1, "week")
      .toISOString();

    await saveNextCheckupDate(nextCheckupDate);

    this.props.navigation.navigate(MAIN_SCREEN);
  };

  onFeeling = async (mood: "good" | "neutral" | "bad") => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    this.setState(prevState => {
      if (!prevState.checkup) {
        return prevState;
      }

      prevState.checkup.currentMood = mood;
      return prevState;
    });
  };

  onChangeNote = (note: string) => {
    this.setState(prevState => {
      if (!prevState.checkup) {
        return prevState;
      }

      prevState.checkup.note = note;
      return prevState;
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
              paddingBottom: 128,
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

            <RoundedSelectorButton
              title="It's going well 👍"
              onPress={() => this.onFeeling("good")}
              selected={this.state.checkup.currentMood === "good"}
            />
            <RoundedSelectorButton
              title="It's going okay 🤷‍"
              onPress={() => this.onFeeling("neutral")}
              selected={this.state.checkup.currentMood === "neutral"}
            />
            <RoundedSelectorButton
              title="It's going poorly 👎"
              onPress={() => this.onFeeling("bad")}
              selected={this.state.checkup.currentMood === "bad"}
            />

            <SubHeader
              style={{
                marginTop: 24,
              }}
            >
              Add a note (optional)
            </SubHeader>

            <View
              style={{
                marginBottom: 24,
              }}
            >
              <TextInput
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={"The past few days have been..."}
                value={this.state.checkup.note}
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChangeNote}
              />
            </View>

            <ActionButton
              title="Finish"
              width="100%"
              disabled={this.state.checkup.currentMood === "unselected"}
              onPress={this.onNext}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
