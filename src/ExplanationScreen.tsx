import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { SubHeader, Paragraph, ThoughtDook, I } from "./ui";
import { ScrollView, View } from "react-native";
import { Constants } from "expo";
import theme from "./theme";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const ThoughtView = ({ children }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 12,
      paddingRight: 48,
    }}
  >
    <ThoughtDook
      style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
      source={require("../assets/yellow/Dook.png")}
    />
    <View
      style={{
        backgroundColor: theme.offwhite,
        borderRadius: 8,
        padding: 8,
      }}
    >
      <Paragraph>{children}</Paragraph>
    </View>
  </View>
);

const Distortion = ({ children }) => (
  <View
    style={{
      marginBottom: 48,
    }}
  >
    {children}
  </View>
);

const AllOrNothingThinking = () => (
  <Distortion>
    <SubHeader>
      {"All or Nothing Thinking"} {"🌓"}
    </SubHeader>

    <Paragraph>
      This distortion happens when we have no room for middle ground. If we
      think that a small fault in ourselves means we’re fundamentally rotten or
      otherwise terrible, we’re likely engaging in all or nothing thinking.
    </Paragraph>

    <ThoughtView>I bombed the interview, I must be unhirable.</ThoughtView>
  </Distortion>
);

const Catastrophizing = () => (
  <Distortion>
    <SubHeader>
      {"Catastrophizing"} {"🤯"}
    </SubHeader>

    <Paragraph>
      If we’re taking a small problem and blowing it <I>way</I> out of
      proportion, we’re catastrophizing. Did you make a small mistake at work
      and are <I>dreading</I> if someone found out even though it’s nothing
      serious? You’re probably catastrophizing.
    </Paragraph>

    <ThoughtView>
      I'm feeling jittery, I might be having a heart attack.
    </ThoughtView>
  </Distortion>
);

const EmotionalReasoning = () => (
  <Distortion>
    <SubHeader>
      {"Emotional Reasoning"} {"🎭"}
    </SubHeader>

    <Paragraph>
      “I feel it, therefore it must be true.” If you find yourself justifying
      the “danger” of something innocuous <I>because</I> you’re afraid of it,
      then you’re likely engaging in emotional reasoning. Things aren’t
      dangerous because we’re afraid of them and we’re not awful just because we
      may think we are. {"\n"}
    </Paragraph>

    <Paragraph>
      This one is often hard to recognize. It takes some effort to recognize
      when your emotional mind is taking the logical reins.
    </Paragraph>

    <ThoughtView>
      I feel guilty, therefore I must have done something bad.
    </ThoughtView>
  </Distortion>
);

const FortuneTelling = () => (
  <Distortion>
    <SubHeader>
      {"Fortune Telling"} {"🔮"}
    </SubHeader>

    <Paragraph>todo</Paragraph>
  </Distortion>
);

class ExplanationScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 25,
          paddingLeft: 25,
          paddingRight: 25,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            marginBottom: Constants.statusBarHeight + 25,
          }}
        >
          <AllOrNothingThinking />
          <Catastrophizing />
          <EmotionalReasoning />
          <FortuneTelling />
        </View>
      </ScrollView>
    );
  }
}

export default ExplanationScreen;
