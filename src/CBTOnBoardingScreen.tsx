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
import { CBT_FORM_SCREEN } from "./screens";
import Swiper from "react-native-swiper";
import { View } from "react-native";
import CBTView from "./CBTView";
import { Thought } from "./thoughts";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { setIsExistingUser, getIsExistingUser } from "./store";
import { AppLoading } from "expo";

const thought: Thought = {
  automaticThought: "I missed George's recital, he must hate me.",
  challenge: `George knows I can't make things, I wouldn't hate him if he missed something of mine. By beating myself up over this, I'm treating myself worse than I treat others.`,
  alternativeThought: `It's true I missed George's recital and I can appologize, but he'll probably forgive me.`,
  cognitiveDistortions: [
    { label: "Mind Reading", slug: "mind-reading", selected: true },
  ],
};

const BigParagraph = ({ children, style }: ParentComponent) => (
  <Paragraph
    style={{
      fontSize: 18,
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
    <ThoughtView>I missed George's recital, he must hate me.</ThoughtView>
  </Main>
);

const IdentifyDistortions = () => (
  <Main>
    <LeftPushedHeader>
      2. Then let's look for <Exaggerated>Cognitive Distortions</Exaggerated>{" "}
    </LeftPushedHeader>
  </Main>
);

const BadThoughtDistortions = () => (
  <Main>
    <LeftPushedHeader>
      Do we really know George will hate us? If not, we're{" "}
      <Exaggerated>Mind Reading.</Exaggerated>
    </LeftPushedHeader>
    <ThoughtView>I missed George's recital, he must hate me.</ThoughtView>
  </Main>
);

const Challenge = () => (
  <Main>
    <LeftPushedHeader>
      3. Let's write down our <Exaggerated>challenge</Exaggerated> to solidify
      it.
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
      Quirk'll store it:
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
      Congrats you're done!
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
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface State {
  isReady: boolean;
}

export default class CBTOnBoardingScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
  };

  constructor(props) {
    super(props);

    getIsExistingUser().then(isExisting => {
      if (isExisting) {
        this.props.navigation.navigate(CBT_FORM_SCREEN);
      }
      this.setState({ isReady: true });
    });
  }

  toFormScreen = async () => {
    await setIsExistingUser();
    this.props.navigation.navigate(CBT_FORM_SCREEN);
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading onError={console.warn} />;
    }

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
        <GotIt onPress={this.toFormScreen} />
      </Swiper>
    );
  }
}
