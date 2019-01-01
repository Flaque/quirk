import React from "react";
import theme from "./theme";
import {
  Header,
  ParentComponent,
  Illustration,
  Container,
  Paragraph,
  ThoughtDook,
  RoundedButton,
} from "./ui";
import Swiper from "react-native-swiper";
import { View } from "react-native";
import CBTView from "./CBTView";
import { Thought } from "./thoughts";
import { normalize } from "./sizes";

const thought: Thought = {
  automaticThought: "I missed George's party, he must hate me.",
  challenge: `George knows I couldn't make it every time, I wouldn't hate him if he missed something of mine.\n\nI should treat myself at least as well as I treat others.`,
  alternativeThought: `It's true I missed George's party, I can appologize, and he'll probably forgive me.`,
  cognitiveDistortions: [
    { label: "Mind Reading", slug: "mind-reading", selected: true },
  ],
};

const BigParagraph = ({ children, style }: ParentComponent) => (
  <Paragraph
    style={{
      fontSize: normalize(18),
      margin: 0,
      padding: 12,
      marginRight: 25,
      borderRadius: 8,
      ...style,
    }}
  >
    {children}
  </Paragraph>
);

const ThoughtView = ({ children }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
    }}
  >
    <ThoughtDook
      style={{ marginRight: 18, marginLeft: 25 }}
      source={require("../assets/yellow/Dook.png")}
    />
    <BigParagraph
      style={{
        backgroundColor: theme.offwhite,
        borderRadius: 8,
      }}
    >
      {children}
    </BigParagraph>
  </View>
);

const Exaggerated = ({ children, style }: ParentComponent) => (
  <Header
    style={{
      color: theme.pink,
      marginBottom: 0,
      margin: 0,
      fontSize: normalize(48),
      ...style,
    }}
  >
    {children}
  </Header>
);

const LeftPushedHeader = ({ children, style }: ParentComponent) => (
  <Header
    style={{
      // Small bump to make things appear more left-aligned
      paddingRight: 48,
      marginBottom: 0,
      fontSize: normalize(48),
      ...style,
    }}
  >
    {children}
  </Header>
);

const Main = ({ children, style }: ParentComponent) => (
  <Container
    style={{
      paddingTop: 50,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 50,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </Container>
);

const Intro = () => (
  <Main>
    <Illustration
      source={require("../assets/logo/logo.png")}
      style={{
        width: 180 * 0.75,
        height: 160 * 0.75,
        alignSelf: "center",
        marginTop: 32,
        marginBottom: 32,
      }}
    />
    <LeftPushedHeader>
      Welcome to <Exaggerated>quirk</Exaggerated>, the{" "}
      <Exaggerated>Cognitive Behavioral Therapy (CBT) </Exaggerated> App.
    </LeftPushedHeader>
  </Main>
);

const CrashCourse = () => (
  <Main>
    <LeftPushedHeader>
      This is a <Exaggerated>crash course</Exaggerated> in CBT and{" "}
      <Exaggerated>not an alternative</Exaggerated> for a trained therapist.
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsCauseYourMoods = () => (
  <Main>
    <LeftPushedHeader>
      First: <Exaggerated>your thoughts cause your moods.</Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsArentYourThoughts = () => (
  <Main>
    <LeftPushedHeader>
      Second: your thoughts can be <Exaggerated>automatic.</Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsAreDistorted = () => (
  <Main>
    <LeftPushedHeader>
      Third: automatic thoughts are often <Exaggerated>distorted.</Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const CBTOverview = () => (
  <Main>
    <LeftPushedHeader>
      The goal of CBT is to recognize the{" "}
      <Exaggerated>distorted thoughts </Exaggerated> and{" "}
      <Exaggerated>replace them</Exaggerated> with rational ones.
    </LeftPushedHeader>
  </Main>
);

const Ready = () => (
  <Main>
    <LeftPushedHeader>
      <Exaggerated>Ready?</Exaggerated> Let's go over the steps.
    </LeftPushedHeader>
  </Main>
);

const Catch = () => (
  <Main>
    <LeftPushedHeader>
      1. We'll start by <Exaggerated>just writing down</Exaggerated> the
      automatic thoughts when they happen.
    </LeftPushedHeader>
  </Main>
);

const BadThoughtNote = () => (
  <Main>
    <LeftPushedHeader>Note the thought: </LeftPushedHeader>
    <ThoughtView>I missed George's party, he must hate me.</ThoughtView>
  </Main>
);

const IdentifyDistortions = () => (
  <Main>
    <LeftPushedHeader>
      2. Look for <Exaggerated>Cognitive Distortions</Exaggerated>{" "}
    </LeftPushedHeader>
  </Main>
);

const BadThoughtDistortions = () => (
  <Main>
    <LeftPushedHeader>
      Do we really know George will hate us? If not, we're{" "}
      <Exaggerated>Mind Reading.</Exaggerated>
    </LeftPushedHeader>
    <ThoughtView>I missed George's party, he must hate me.</ThoughtView>
  </Main>
);

const Challenge = () => (
  <Main>
    <LeftPushedHeader>
      3. <Exaggerated>Debate the thought!</Exaggerated> Write a{" "}
      <Exaggerated>challenge</Exaggerated> to solidify your logic.
    </LeftPushedHeader>
  </Main>
);

const WriteChallenge = () => (
  <Main>
    <LeftPushedHeader>Something like this:</LeftPushedHeader>
    <BigParagraph
      style={{
        backgroundColor: theme.offwhite,
        borderRadius: 8,
        marginTop: 18,
      }}
    >
      {thought.challenge}
    </BigParagraph>
  </Main>
);

const AlternativeThought = () => (
  <Main>
    <LeftPushedHeader>
      4. Finally, we'll write an <Exaggerated>alternative thought.</Exaggerated>
    </LeftPushedHeader>
    <ThoughtView>{thought.alternativeThought}</ThoughtView>
  </Main>
);

const ShowOff = () => (
  <Main
    style={{
      alignItems: "flex-start",
    }}
  >
    <LeftPushedHeader style={{ marginBottom: 18 }}>
      Find it later:
    </LeftPushedHeader>
    <CBTView thought={thought} />
  </Main>
);

const GotIt = ({ onPress }) => (
  <Main
    style={{
      alignItems: "flex-start",
    }}
  >
    <LeftPushedHeader style={{ marginBottom: 18 }}>
      And that's really about it.
    </LeftPushedHeader>

    <RoundedButton
      title={"Let's go!"}
      disabled={false}
      fillColor={theme.blue}
      width={150}
      onPress={onPress}
    />
  </Main>
);

interface Props {
  toFormScreen: () => void;
}

export default class CBTOnBoardingScreen extends React.Component<Props> {
  render() {
    return (
      <Swiper
        loop={false}
        dotColor={theme.offwhite}
        activeDotColor={theme.pink}
      >
        <Intro />
        <CrashCourse />
        <YourThoughtsCauseYourMoods />
        <YourThoughtsArentYourThoughts />
        <YourThoughtsAreDistorted />
        <CBTOverview />
        <Ready />
        <Catch />
        <BadThoughtNote />
        <IdentifyDistortions />
        <BadThoughtDistortions />
        <Challenge />
        <WriteChallenge />
        <AlternativeThought />
        <ShowOff />
        <GotIt onPress={this.props.toFormScreen} />
      </Swiper>
    );
  }
}
