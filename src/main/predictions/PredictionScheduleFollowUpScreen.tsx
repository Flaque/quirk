import React from "react";
import theme from "../../theme";
import { MediumHeader, HintHeader, SubHeader, ActionButton } from "../../ui";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { KeyboardAvoidingView, StatusBar, ScrollView } from "react-native";
import * as Haptic from "expo-haptics";
import haptic from "../../haptic";
import { TextInput } from "../../textInputStyle";
import { ASSUMPTION_NOTE_SCREEN } from "../screens";

export default class PredictionScheduleFollowUpScreen extends React.Component<
  ScreenProps,
  {
    event: string;
    felt: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    event: "",
    felt: "",
  };

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.navigate(ASSUMPTION_NOTE_SCREEN);
  };

  onFelt = async (felt: string) => {
    this.setState({
      felt,
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          paddingHorizontal: 24,
        }}
      >
        <StatusBar hidden={false} />
        <KeyboardAvoidingView
          behavior="position"
          style={{
            paddingBottom: 24,
          }}
        >
          <MediumHeader>New Prediction 🔮</MediumHeader>
          <HintHeader>
            Predict your experience of an upcoming event and we’ll follow-up
            later to see if you were correct.
          </HintHeader>

          <SubHeader
            style={{
              marginTop: 24,
            }}
          >
            Event or Task
          </SubHeader>
          <TextInput
            onChangeText={event => {
              this.setState({
                event,
              });
            }}
            value={this.state.event}
            placeholder="ex: giving a presentation in front of..."
            multiline={true}
            numberOfLines={6}
          />

          <ActionButton
            style={{
              marginTop: 12,
            }}
            title="Continue"
            onPress={this.onFinish}
            width={"100%"}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
