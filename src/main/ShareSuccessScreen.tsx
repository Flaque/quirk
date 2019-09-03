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
import { StatusBar, Text } from "react-native";
import { Thought } from "../thoughts";
import { get } from "lodash";
import * as stats from "../stats";
import { FINISHED_SCREEN } from "./screens";
import { apiGet, apiPost } from "../api";
import Sentry from "../sentry";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { scheduleHappyFolksNotification } from "../notifications/scheduleNotification";
import dayjs from "dayjs";

export default class ShareSuccessScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
    feelingGoodFolks: number;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    feelingGoodFolks: 60,
    thought: undefined,
  };

  componentDidMount() {
    this.onLoadSuccess();
    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "state.params.thought");
      this.setState({
        thought,
      });
      this.onLoadSuccess();
    });
  }

  onContinue = () => {
    this.props.navigation.navigate(FINISHED_SCREEN, {
      thought: this.state.thought,
    });
  };

  onShareSuccess = async () => {
    this.setState(prevState => {
      return {
        ...prevState,
        feelingGoodFolks: prevState.feelingGoodFolks + 1,
      };
    });

    await scheduleHappyFolksNotification(
      dayjs()
        .add(40, "second")
        .toISOString()
    );

    // await apiPost("/happyfolks/new", {});

    haptic.notification(Haptic.NotificationFeedbackType.Success);
    setTimeout(() => {
      this.props.navigation.navigate(FINISHED_SCREEN, {
        thought: this.state.thought,
      });
    }, 100);
  };

  onLoadSuccess = async () => {
    try {
      const data = await apiGet("/happyfolks");
      const { result } = await data.json();

      this.setState({
        feelingGoodFolks: result,
      });
    } catch (err) {
      Sentry.captureException(err);
    }
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
          Anonymously help others with your success.
        </MediumHeader>
        <HintHeader
          style={{
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          ~<Text>{this.state.feelingGoodFolks}</Text> people recently reported
          feeling better, you can add to the count to reduce stigma for others.
          This doesn't share your thoughts with anyone.
        </HintHeader>

        <ActionButton
          title="+1"
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
