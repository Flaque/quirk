import React from "react";
import ScreenProps from "../../ScreenProps";
import {
  Container,
  MediumHeader,
  HintHeader,
  ActionButton,
  GhostButton,
} from "../../ui";
import Constants from "expo-constants";
import theme from "../../theme";
import { StatusBar } from "react-native";
import { identify } from "../../id";
import { FINISHED_SCREEN } from "../screens";
import { Thought } from "../../thoughts";
import { get } from "lodash";
import dayjs from "dayjs";
import { saveExercise } from "../../thoughtstore";

export default class FollowUpScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // This has to be called at SOME point before the user selects ok
    // otherwise we dunno who to checkin with.
    // It's very likely this has already been called before, but
    // we put it here just in case.
    identify();

    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
      });
    });
  }

  onSetCheckup = async () => {
    // TODO tell api that there's a follow-up scheduled

    // Tell the user/app we've got a followup scheduled
    const thought = this.state.thought;
    thought.followUpDate = dayjs()
      .add(1, "second")
      .toISOString();
    await saveExercise(thought);

    this.onContinue();
  };

  onContinue = () => {
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought: this.state.thought,
    });
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
          perspective.
        </HintHeader>

        <ActionButton
          title="Sure, let's do it."
          width={"100%"}
          style={{
            marginBottom: 12,
          }}
          onPress={this.onSetCheckup}
        />
        <GhostButton
          title="No thanks."
          width={"100%"}
          borderColor={theme.gray}
          textColor={theme.lightText}
          onPress={this.onContinue}
        />
      </Container>
    );
  }
}
