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

    <Paragraph>
      This distortion happens when we predict the future. We often overestimate
      our abilities to predict what will happen. Frequently we'll start at
      something we're worried might happen and then look for evidence that it
      will occur.
    </Paragraph>
  </Distortion>
);

const Labeling = () => (
  <Distortion>
    <SubHeader>
      {"Labeling"} {"🏷"}
    </SubHeader>

    <Paragraph>
      If we're taking one characteristic of a person and applying it to the
      whole person, we're labeling. If someone brushed us off, they might not be
      a "jerk," maybe they're just in a hurry. This applies to ourselves as
      well; just because we make a mistake doesn't mean we're a "failure."
    </Paragraph>
  </Distortion>
);

const MagnificationOfTheNegative = () => (
  <Distortion>
    <SubHeader>
      {"Magnification of the Negative"} {"👎"}
    </SubHeader>

    <Paragraph>
      If you’re judging a situation based <I>entirely</I> on the negative parts
      and not considering the positive parts, you’re likely magnifying the
      negative. If you’re constantly berating yourself for bombing a job
      interview, you’re probably filtering out all the experience you gained
      from that interview.
    </Paragraph>
  </Distortion>
);

const MindReading = () => (
  <Distortion>
    <SubHeader>
      {"Mind Reading"} {"🧠"}
    </SubHeader>

    <Paragraph>
      If we're worried about what someone else is thinking about us, we're
      attempting to read minds. Unless someone tells you what they're thinking,
      you have absolutely no way of knowing. So why assume the worst?
    </Paragraph>
  </Distortion>
);

const MimizationOfThePositive = () => (
  <Distortion>
    <SubHeader>
      {"Minimization of the Positive"} {"👍"}
    </SubHeader>

    <Paragraph>
      If we're worried about what someone else is thinking about us, we're
      attempting to read minds. Unless someone tells you what they're thinking,
      you have absolutely no way of knowing. So why assume the worst?
    </Paragraph>
  </Distortion>
);

const OtherBlaming = () => (
  <Distortion>
    <SubHeader>
      {"Other Blaming"} {"🦹‍"}
    </SubHeader>

    <Paragraph>
      If a bad situation must be the fault of someone, we're other-blaming. If
      you failed an exam and you're blaming the teacher, you're directing your
      energy to the wrong place. Someone cut you off on the highway? If you honk
      your horn, flip them off, and stew, how is that helping? Now you're cut
      off and mad! {`\n`}
    </Paragraph>

    <Paragraph>
      This doesn't mean you have to blame yourself for every negative situation.
      You don't have to blame anyone. No one has to be at fault if you let the
      situation pass without attaching blame.
    </Paragraph>
  </Distortion>
);

const OverGeneralization = () => (
  <Distortion>
    <SubHeader>
      {"Over Generalization"} {"👯‍"}
    </SubHeader>

    <Paragraph>
      If we draw conclusions based on just one example, we're over generalizing.
      If you bombed a presentation and assume that means you're "bad" at
      presenting, you're over-generalizing.
    </Paragraph>
  </Distortion>
);

const SelfBlaming = () => (
  <Distortion>
    <SubHeader>
      {"Self Blaming"} {"👁"}
    </SubHeader>

    <Paragraph>
      If you're attributing a negative situation entirely to yourself, you're
      self-blaming. You don't have to be responsible for every bad thing that
      happens. If you're getting caught in traffic and you're berating yourself
      for not leaving earlier, you're self-blaming. Would you treat someone else
      this way?
    </Paragraph>
  </Distortion>
);

const ShouldStatements = () => (
  <Distortion>
    <SubHeader>
      {"Should Statements"} {"✨"}
    </SubHeader>

    <Paragraph>
      If you're assigning someone abilities they don't have, you're using faulty
      "should" statements. For example, if you have a fear of flying and are
      telling yourself "I shouldn't be afraid of this, there's nothing wrong
      with the airplane!" you're putting an undue burden on yourself. You have a
      fear of flying! It's normal for people who have a fear of flying to be
      afraid flying! {"\n"}
    </Paragraph>

    <Paragraph>
      Should statements can seem nonsensical when you say it out loud; that's
      the point! They're illogical!
    </Paragraph>
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
          <Labeling />
          <MagnificationOfTheNegative />
          <MindReading />
          <MimizationOfThePositive />
          <OtherBlaming />
          <OverGeneralization />
          <SelfBlaming />
          <ShouldStatements />
        </View>
      </ScrollView>
    );
  }
}

export default ExplanationScreen;
