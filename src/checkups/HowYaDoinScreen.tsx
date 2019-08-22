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
import { newCheckup, saveCheckup } from "./checkupstore";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import { CHECKUP_SUMMARY_SCREEN } from "./screens";
import { get } from "lodash";

export default class HowYaDoinScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    checkup: null,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const checkup = get(args, "action.params.checkup", newCheckup());

      this.setState({
        checkup,
      });
    });
  }

  onNext = async () => {
    if (this.state.checkup.mood === "unselected") {
      return;
    }

    await saveCheckup(this.state.checkup);

    this.props.navigation.navigate(CHECKUP_SUMMARY_SCREEN, {
      checkup: this.state.checkup
    });
  };

  onFeeling = async (felt: "good" | "neutral" | "bad") => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    this.setState({
      mood: felt,
    });
  };

  onChangeNote = (note: string) => {
    this.setState(({checkup}) => {
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
              selected={this.state.mood === "good"}
            />
            <RoundedSelectorButton
              title="It's going okay 🤷‍"
              onPress={() => this.onFeeling("neutral")}
              selected={this.state.mood === "neutral"}
            />
            <RoundedSelectorButton
              title="It's going poorly 👎"
              onPress={() => this.onFeeling("bad")}
              selected={this.state.mood === "bad"}
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
                value={this.state.note}
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChangeNote}
              />
            </View>

            <ActionButton
              title="Next"
              width="100%"
              disabled={this.state.mood === ""}
              onPress={this.onNext}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Container>
    );
  }
}
