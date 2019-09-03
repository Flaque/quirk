import React from "react";
import ScreenProps from "../ScreenProps";
import {
  Container,
  MediumHeader,
  HintHeader,
  ActionButton,
  GhostButton,
} from "../ui";
import Constants from "expo-constants";
import theme from "../theme";
import { StatusBar } from "react-native";
import { Thought } from "../thoughts";
import { get } from "lodash";
import * as stats from "../stats";
import { FINISHED_SCREEN } from "./screens";

export default class ShareSuccessScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
      });
    });
  }

  onContinue = () => {
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought: this.state.thought,
    });
  };

  onShareSuccess = () => {
    console.log("ahh");
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="dark-content" hidden={false} />
        <MediumHeader
          style={{
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Want to follow up later?
        </MediumHeader>
        <HintHeader
          style={{
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          This is a chance to re-examine your thoughts with a different
          perspective and cement your changed view.
        </HintHeader>

        <ActionButton
          title="Sure, let's do it."
          width={"100%"}
          style={{
            marginBottom: 12,
          }}
          onPress={this.onShareSuccess}
        />
        <GhostButton
          title="No thanks."
          width={"100%"}
          borderColor={theme.gray}
          textColor={theme.lightText}
          onPress={() => {
            stats.userDidNotScheduleFollowUp();
            this.onContinue();
          }}
        />
      </Container>
    );
  }
}
