import React from "react";
import theme from "../../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  Row,
  Container,
  Paragraph,
  SubHeader,
} from "../../ui";
import {
  textInputStyle,
  textInputPlaceholderColor,
} from "../../textInputStyle";
import * as stats from "../../stats";
import ScreenProps from "../../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";
import { Thought } from "../../thoughts";
import { FOLLOW_UP_FEELING_SCREEN } from "../screens";
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from "react-native";
import { saveThought } from "../../thoughtstore";
import haptic from "../../haptic";
import * as Haptic from "expo-haptics";

export default class FollowUpNoteScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      this.refreshFromNavigation(args);
    });

    this.props.navigation.addListener("didFocus", args => {
      this.refreshFromNavigation(args);
    });
  }

  refreshFromNavigation = args => {
    const thought = get(args, "state.params.thought");
    this.setState({
      thought,
    });
  };

  onChange = (txt: string) => {
    this.setState(prevState => {
      if (!prevState.thought) {
        return prevState;
      }

      prevState.thought.followUpNote = txt;
      return prevState;
    });
  };

  onFinish = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    const thought = await saveThought(this.state.thought);
    this.props.navigation.push(FOLLOW_UP_FEELING_SCREEN, {
      thought,
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
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
          {this.state.thought && (
            <>
              <MediumHeader
                style={{
                  marginBottom: 12,
                  marginLeft: 0,
                }}
              >
                Alright, let's start your follow-up.
              </MediumHeader>
              <HintHeader
                style={{
                  marginBottom: 24,
                }}
              >
                This is a chance for you to re-evaluate your thoughts with a
                clearer perspective or to get closure on anything that happened.
              </HintHeader>

              <View
                style={{
                  marginBottom: 24,
                }}
              >
                <SubHeader>Your Automatic Thought</SubHeader>
                <Paragraph>{`"${
                  this.state.thought.automaticThought
                }"`}</Paragraph>
              </View>

              <SubHeader>Add a Follow-up Note</SubHeader>
              <HintHeader>
                Does your thought seem accurate still? Did anything else happen?
              </HintHeader>

              <TextInput
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={`ex: "it wasn't as bad as I had thought"`}
                value={this.state.thought.followUpNote}
                multiline={true}
                numberOfLines={6}
                onChangeText={this.onChange}
                onBlur={() => stats.userFilledOutFormField("followup_note")}
              />

              <Row
                style={{
                  marginTop: 24,
                  justifyContent: "flex-end",
                }}
              >
                <ActionButton
                  title={"Save"}
                  onPress={() => this.onFinish()}
                  width={"100%"}
                />
              </Row>
            </>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
