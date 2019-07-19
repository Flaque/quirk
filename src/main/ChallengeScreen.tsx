import React from "react";
import theme from "../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  Row,
  GhostButton,
  Container,
} from "../ui";
import { TextInput } from "react-native-gesture-handler";
import { textInputStyle } from "./textInputStyle";
import { textInputPlaceholderColor } from "../form/textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { get } from "lodash";

export default class ChallengeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: undefined,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought", "🤷‍");
      this.setState({
        thought,
      });

      // This is a bit of a hack to trigger the fade in for the thought.
      setTimeout(async () => {
        await this.setState({
          shouldShowPreviousThought: true,
        });
      }, 50);
    });
  }

  render() {
    return (
      <Container
        style={{
          marginTop: Constants.statusBarHeight,
        }}
      >
        {this.state.thought && (
          <>
            <MediumHeader>Challenge your thought</MediumHeader>
            <HintHeader>
              In your own words, write out what about your thought is distorted.
            </HintHeader>

            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
              value={this.state.thought.challenge}
              multiline={true}
              numberOfLines={6}
              autoFocus={true}
              onChangeText={txt => {
                this.setState({
                  alternativeThought: txt,
                });
              }}
              onFocus={() => {
                this.setState({
                  view: "peak",
                });
              }}
              onBlur={() => stats.userFilledOutFormField("automatic")}
            />

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <GhostButton
                borderColor={theme.lightGray}
                textColor={theme.veryLightText}
                title={"Learn More"}
                style={{
                  marginRight: 24,
                  flex: 1,
                }}
              />
              <ActionButton
                title={"Next"}
                onPress={() => this.props.onNext(this.state.alternativeThought)}
              />
            </Row>
          </>
        )}
      </Container>
    );
  }
}
