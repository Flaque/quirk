/**
 * This is roughly based off Superhuman's PMF survey.
 */

import React from "react";
import {
  MediumHeader,
  HintHeader,
  RoundedSelectorButton,
  SubHeader,
  ActionButton,
} from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, ScrollView, StatusBar } from "react-native";
import theme from "../../theme";
import haptic from "../../haptic";
import * as Haptic from "expo-haptics";
import { THOUGHT_SCREEN } from "../screens";
import { addTagsToUser } from "../../id";
import {
  userRecordedDisappointedSurvey,
  userRecordedBenefitSurvey,
  userRecordedTypeOfPersonSurvey,
  userRecordedCouldImproveSurvey,
} from "./stats";
import { resetNavigationTo } from "../../resetNavigationTo";
import SinglePageForm from "../../SinglePageForm";
import { TextInput } from "../../textInputStyle";

export default class SurveyScreen extends React.Component<
  ScreenProps,
  {
    index: number;
    typeOfPersonValue: string;
    benefitOfQuirkValue: string;
    improveQuirkValue: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    index: 0,
    typeOfPersonValue: "",
    benefitOfQuirkValue: "",
    improveQuirkValue: "",
  };

  onRecordDisappointment = async (answer: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Record over time
    userRecordedDisappointedSurvey(answer);
    await addTagsToUser({
      disappointedAnswer: answer,
    });

    this.onNext();
  };

  onChangeTypeOfPerson = async (typeOfPersonValue: string) => {
    this.setState({
      typeOfPersonValue,
    });
  };

  onChangeBenefit = async (benefitOfQuirkValue: string) => {
    this.setState({
      benefitOfQuirkValue,
    });
  };

  onChangeImproveQuirk = async (improveQuirkValue: string) => {
    this.setState({
      improveQuirkValue,
    });
  };

  // From editing
  onFinish = async () => {
    haptic.notification(Haptic.NotificationFeedbackType.Success);

    // Send values
    userRecordedBenefitSurvey(this.state.benefitOfQuirkValue);
    userRecordedTypeOfPersonSurvey(this.state.typeOfPersonValue);
    userRecordedCouldImproveSurvey(this.state.improveQuirkValue);

    resetNavigationTo(this.props.navigation, THOUGHT_SCREEN);
  };

  onNext = async () => {
    if (this.state.index === 3) {
      this.onFinish();
      return;
    }

    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.setState(prevState => {
      return {
        index: prevState.index + 1,
      };
    });
  };

  renderDisappointedStep() {
    return (
      <>
        <MediumHeader
          style={{
            marginBottom: 24,
          }}
        >
          Question 1 of 4
        </MediumHeader>

        <SubHeader>
          How would you feel if you could no longer use Quirk?
        </SubHeader>
        <HintHeader>
          This is just for feedback purposes; Quirk isn't going anywhere.
        </HintHeader>

        <RoundedSelectorButton
          title="Very Disappointed"
          onPress={() => this.onRecordDisappointment("very")}
        />
        <RoundedSelectorButton
          title="Somewhat Disappointed"
          onPress={() => this.onRecordDisappointment("somewhat")}
        />
        <RoundedSelectorButton
          title="Not Disappointed"
          onPress={() => this.onRecordDisappointment("not")}
        />
      </>
    );
  }

  renderKindOfPeople() {
    return (
      <>
        <MediumHeader
          style={{
            marginBottom: 24,
          }}
        >
          Question 2 of 4
        </MediumHeader>

        <SubHeader>
          What type of people do you think would most benefit from Quirk?
        </SubHeader>

        <TextInput
          multiline={true}
          numberOfLines={6}
          placeholder="... type something"
          onChangeText={this.onChangeTypeOfPerson}
          value={this.state.typeOfPersonValue}
        />
        <ActionButton
          style={{
            marginTop: 12,
          }}
          width={"100%"}
          title="Next"
          onPress={() => this.onNext()}
        />
      </>
    );
  }

  renderMainBenefit() {
    return (
      <>
        <MediumHeader
          style={{
            marginBottom: 24,
          }}
        >
          Question 3 of 4
        </MediumHeader>

        <SubHeader>What's the main benefit you receive from Quirk?</SubHeader>
        <TextInput
          multiline={true}
          numberOfLines={6}
          placeholder="... type something"
          onChangeText={this.onChangeBenefit}
          value={this.state.benefitOfQuirkValue}
        />
        <ActionButton
          style={{
            marginTop: 12,
          }}
          width={"100%"}
          title="Next"
          onPress={() => this.onNext()}
        />
      </>
    );
  }

  renderImproveQuirk() {
    return (
      <>
        <MediumHeader
          style={{
            marginBottom: 24,
          }}
        >
          Question 4 of 4
        </MediumHeader>

        <SubHeader>How can we improve Quirk for you?</SubHeader>
        <TextInput
          multiline={true}
          numberOfLines={6}
          placeholder="... type something"
          onChangeText={this.onChangeImproveQuirk}
          value={this.state.improveQuirkValue}
        />
        <ActionButton
          style={{
            marginTop: 12,
          }}
          width={"100%"}
          title="Finish"
          onPress={() => this.onNext()}
        />
      </>
    );
  }

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
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
          }}
        >
          <StatusBar hidden={false} />

          <SinglePageForm
            steps={[
              this.renderDisappointedStep(),
              this.renderKindOfPeople(),
              this.renderMainBenefit(),
              this.renderImproveQuirk(),
            ]}
            index={this.state.index}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
