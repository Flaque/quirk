import React from "react";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import theme from "../../theme";
import {
  SubHeader,
  MediumHeader,
  Paragraph,
  HintHeader,
  LI,
  ActionButton,
} from "../../ui";
import { ScrollView, StatusBar } from "react-native";
import { ASSUMPTION_SCREEN } from "../screens";

export default class PredictionOnboardingScreen extends React.Component<
  ScreenProps
> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          paddingHorizontal: 24,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <StatusBar hidden={false} />
        <MediumHeader>What are Predictions?</MediumHeader>
        <HintHeader>Read this; you'll only see it once.</HintHeader>

        <SubHeader>Overview</SubHeader>
        <Paragraph
          style={{
            marginBottom: 12,
          }}
        >
          This exercise lets you predict your enjoyment of upcoming events or
          tasks. Use it to test your ability to tell the future.
        </Paragraph>

        <SubHeader>When to use Predictions</SubHeader>
        <Paragraph
          style={{
            marginBottom: 12,
          }}
        >
          You can use Predictions like a TODO-list for stuff you're anxious
          about. A good cue is procrastinating something or being overly
          concerned with the consequences of a minor mistake you made.
        </Paragraph>

        <SubHeader>Examples</SubHeader>

        <LI>You're afraid of flying on the airplane you're about to board.</LI>
        <LI>
          You have a test tomorrow, but you're procrastinating studying for it.
        </LI>
        <LI>
          You used to really enjoy cooking, but you now predict you "can't enjoy
          it anymore."
        </LI>
        <LI>
          You were 5 minutes late and now you're convinced your boss is going to
          fire you.
        </LI>
        <LI>
          You have a dentist appointment in the morning and you can't sleep
          because you're worried it will be terrible.
        </LI>

        <ActionButton
          style={{
            marginTop: 12,
            marginBottom: 48,
          }}
          width="100%"
          title="Continue"
          onPress={() => {
            this.props.navigation.navigate(ASSUMPTION_SCREEN);
          }}
        />
      </ScrollView>
    );
  }
}
