import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  HintHeader,
  SubHeader,
  Paragraph,
  Row,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, View } from "react-native";
import { MAIN_SCREEN, CHECKUP_SCREEN } from "../screens";

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
        width: 24,
        height: 24,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: theme.lightGray,
        marginRight: 12,
        borderRadius: 8,
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

export default class CheckupPromptScreen extends React.Component<
  ScreenProps,
  {
    slugs: string[];
  }
> {
  static navigationOptions = {
    header: null,
  };

  onContinue = () => {
    this.props.navigation.navigate(MAIN_SCREEN);
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
          <MediumHeader>Quirk is built around weekly milestones.</MediumHeader>
          <HintHeader
            style={{
              marginBottom: 24,
            }}
          >
            These help you see your progress over time and set goals for the
            next week.
          </HintHeader>

          <SubHeader>Your goals for this first week are to:</SubHeader>

          <ListItem
            index="1"
            text={`Read through "How to use Quirk" in the Learn section of the app.`}
          />
          <ListItem
            index="2"
            text={`Record and challenge automatic negative thoughts when they happen.`}
          />
          <ListItem index="3" text={`Reach your next milestone.`} />

          <ActionButton
            onPress={() => {
              this.props.navigation.navigate(CHECKUP_SCREEN);
            }}
            title="Start First Milestone"
            width="100%"
            style={{
              marginTop: 24,
            }}
          />
        </ScrollView>
      </Container>
    );
  }
}
