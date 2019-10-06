import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  SubHeader,
  Paragraph,
  Row,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import { MAIN_SCREEN } from "../screens";
import { ASSUMPTION_SCREEN } from "../main/screens";
import { get } from "lodash";

const ListItem = ({ index, text }) => (
  <Row
    style={{
      justifyContent: "flex-start",
      marginRight: 12,
      marginBottom: 12,
    }}
  >
    <View
      style={{
        width: 18,
        height: 18,
        backgroundColor: theme.lightBlue,
        borderWidth: 1,
        borderLeftWidth: 2,
        borderColor: theme.blue,
        marginRight: 12,
        borderRadius: 24,
        alignSelf: "center",
      }}
    />
    <Paragraph
      style={{
        alignSelf: "center",
        flex: 1,
      }}
    >
      {text}
    </Paragraph>
  </Row>
);

const EXAMPLES = {
  fortune_telling: "Tomorrow's job interview",
  outcome: "Results of yesterday's test",
  procrastination: "Studying for tomorrow's test",
};

export default class PredictionPromptScreen extends React.Component<
  ScreenProps,
  {
    type: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    type: "",
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", args => {
      const type = get(args, "action.params.type");
      this.setState({
        type,
      });
    });
  }

  onContinue = () => {
    this.props.navigation.navigate(MAIN_SCREEN);
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
        <MediumHeader>Let's make a prediction.</MediumHeader>

        {this.state.type !== "procrastination" && (
          <>
            <Paragraph
              style={{
                marginBottom: 6,
              }}
            >
              When you're anxious about the future, you're Fortune Telling.
              People are generally quite bad at telling the future, but it's
              hard to understand that in the moment. So instead, you'll write
              down how you think something will go, and Quirk will follow up
              with you later to see if you were correct.
            </Paragraph>

            <Paragraph
              style={{
                marginBottom: 24,
              }}
            >
              In the meantime, Quirk will run you through one of the most common
              CBT exercises to help you with your immediate anxiety.
            </Paragraph>
          </>
        )}

        {this.state.type === "procrastination" && (
          <>
            <Paragraph
              style={{
                marginBottom: 6,
              }}
            >
              When you're putting off a healthy behavior like studying for a
              test, seeing friends, or exercising, it's often due to a distorted
              prediction of what that healthy behavior will actually be like.
              You might think it will be boring, or stressful, or maybe just not
              very fun. This could be true, but it's not necessarily true. You
              might find you enjoyed yourself or that you feel quite productive
              afterwards.
            </Paragraph>
            <Paragraph
              style={{
                marginBottom: 24,
              }}
            >
              To overcome this type of procrastination, you'll make a prediction
              about how you think your task will go. Then, we'll walk through a
              common CBT exercise to challenge the validity of your anxiety.
              Then, you'll go out and do the task. Finally, we'll follow up to
              check if your prediction was accurate.
            </Paragraph>
          </>
        )}

        <SubHeader>
          In the next screen, you'll put a future event you're anxious about
          like:
        </SubHeader>
        <Paragraph
          style={{
            padding: 12,
            backgroundColor: theme.offwhite,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {this.state.type && EXAMPLES[this.state.type]}
        </Paragraph>

        <SubHeader>As a quick summary, we'll be:</SubHeader>

        <ListItem
          index="1"
          text={`"Predicting" how we think the future will go.`}
        />
        <ListItem
          index="2"
          text={`Challenging the validity of that prediction through a CBT exercise.`}
        />
        <ListItem
          index="3"
          text={`Following up later to check if our prediction was correct.`}
        />

        <ActionButton
          onPress={() => {
            this.props.navigation.navigate(ASSUMPTION_SCREEN);
          }}
          title="Start First Prediction"
          width="100%"
          style={{
            marginTop: 24,
            marginBottom: 48
          }}
        />
      </ScrollView>
    );
  }
}
