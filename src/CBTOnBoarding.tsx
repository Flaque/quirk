import React from "react";
import theme from "./theme";
import {
  Header,
  ParentComponent,
  Illustration,
  Container,
  ThoughtDook,
  ActionButton,
} from "./ui";
import Swiper from "react-native-swiper";
import universalHaptic from "./haptic";
import { View, Text, Dimensions } from "react-native";
import CBTView from "./CBTView";
import { Thought } from "./thoughts";
import i18n from "./i18n";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { Haptic } from "expo";
import { recordScreenCallOnFocus } from "./navigation";
import * as stats from "./stats";

const thought: Thought = {
  automaticThought: i18n.t("onboarding_screen.auto_thought_ex"),
  challenge: i18n.t("onboarding_screen.challenge_ex"),
  alternativeThought: i18n.t("onboarding_screen.alt_thought_ex"),
  cognitiveDistortions: [
    {
      label: i18n.t("onboarding_screen.cog_distortion.label"),
      slug: i18n.t("onboarding_screen.cog_distortion.slug"),
      selected: true,
    },
  ],
};

// Really simple hack to get fontsizes mostly working
const bigFont = (): number => {
  const height = Dimensions.get("screen").height;
  // size of iPhone SE
  if (height <= 568) {
    // argle bargle why are there so many screen sizes and no good
    // scaling support 😭
    return 32;
  }
  return 48;
};

const BigParagraph = ({ children, style }: ParentComponent) => (
  <Text
    style={{
      fontSize: 18,
      margin: 0,
      padding: 12,
      marginRight: 25,
      borderRadius: 8,
      color: theme.darkText,
      ...style,
    }}
  >
    {children}
  </Text>
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

const Exaggerated = ({ children, style }: ParentComponent) => {
  return (
    <Text
      style={{
        color: theme.pink,
        fontWeight: "900",
        marginBottom: 0,
        margin: 0,
        fontSize: bigFont(),
        ...style,
      }}
      allowFontScaling={false}
    >
      {children}
    </Text>
  );
};

const LeftPushedHeader = ({ children, style }: ParentComponent) => (
  <Text
    style={{
      // Small bump to make things appear more left-aligned
      paddingRight: 48,
      fontWeight: "900",
      marginBottom: 0,
      fontSize: bigFont(),
      flexWrap: "wrap",
      color: theme.darkText,
      ...style,
    }}
    allowFontScaling={false}
  >
    {children}
  </Text>
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
      {i18n.t("onboarding_screen.intro.line1")}{" "}
      <Exaggerated>{i18n.t("onboarding_screen.intro.emphasis1")}</Exaggerated>
      {i18n.t("onboarding_screen.intro.line2")}{" "}
      <Exaggerated>{i18n.t("onboarding_screen.intro.emphasis2")}</Exaggerated>{" "}
      {i18n.t("onboarding_screen.intro.line3")}
    </LeftPushedHeader>
  </Main>
);

const CrashCourse = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.crash_course.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.crash_course.emphasis1")}
      </Exaggerated>{" "}
      {i18n.t("onboarding_screen.crash_course.line2")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.crash_course.emphasis2")}
      </Exaggerated>{" "}
      {i18n.t("onboarding_screen.crash_course.line3")}
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsCauseYourMoods = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.mood_thoughts.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.mood_thoughts.emphasis1")}
      </Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsArentYourThoughts = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.thoughts_arent_thoughts.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.thoughts_arent_thoughts.emphasis1")}
      </Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const YourThoughtsAreDistorted = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.your_distorted.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.your_distorted.emphasis1")}
      </Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const CBTOverview = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.cbt_overview.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.cbt_overview.emphasis1")}
      </Exaggerated>{" "}
      {i18n.t("onboarding_screen.cbt_overview.line2")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.cbt_overview.emphasis2")}
      </Exaggerated>{" "}
      {i18n.t("onboarding_screen.cbt_overview.line3")}
    </LeftPushedHeader>
  </Main>
);

const Ready = () => (
  <Main>
    <LeftPushedHeader>
      <Exaggerated>{i18n.t("onboarding_screen.ready.emphasis1")}</Exaggerated>{" "}
      {i18n.t("onboarding_screen.ready.line1")}
    </LeftPushedHeader>
  </Main>
);

const Catch = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.catch.line1")}{" "}
      <Exaggerated>{i18n.t("onboarding_screen.catch.emphasis1")}</Exaggerated>{" "}
      {i18n.t("onboarding_screen.catch.line2")}
    </LeftPushedHeader>
  </Main>
);

const BadThoughtNote = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.bad_thought_note.line1")}
    </LeftPushedHeader>
    <ThoughtView>
      {i18n.t("onboarding_screen.bad_thought_note.line2")}
    </ThoughtView>
  </Main>
);

const IdentifyDistortions = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.identify_distortions.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.identify_distortions.emphasis1")}
      </Exaggerated>{" "}
    </LeftPushedHeader>
  </Main>
);

const BadThoughtDistortions = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.bad_distortions.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.bad_distortions.emphasis1")}.
      </Exaggerated>
    </LeftPushedHeader>
    <ThoughtView>
      {i18n.t("onboarding_screen.bad_distortions.line2")}
    </ThoughtView>
  </Main>
);

const Challenge = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.challenge_screen.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.challenge_screen.emphasis1")}
      </Exaggerated>
    </LeftPushedHeader>
  </Main>
);

const WriteChallenge = () => (
  <Main>
    <LeftPushedHeader>
      {i18n.t("onboarding_screen.write_challenge.line1")}
    </LeftPushedHeader>
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
      {i18n.t("onboarding_screen.alt_thought.line1")}{" "}
      <Exaggerated>
        {i18n.t("onboarding_screen.alt_thought.emphasis1")}
      </Exaggerated>
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
      {i18n.t("onboarding_screen.show_off.line1")}
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
      {i18n.t("onboarding_screen.got_it.line1")}
    </LeftPushedHeader>

    <ActionButton
      title={i18n.t("onboarding_screen.got_it.btn_title")}
      disabled={false}
      fillColor={theme.blue}
      width={150}
      onPress={onPress}
    />
  </Main>
);

export const CBTOnBoardingComponent = ({
  handleScreenTransition,
}: {
  handleScreenTransition: () => void;
}) => (
  <Swiper loop={false} dotColor={theme.offwhite} activeDotColor={theme.pink}>
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
    <GotIt
      onPress={() => {
        universalHaptic.notification(Haptic.NotificationFeedbackType.Success);
        stats.endedOnboarding();
        handleScreenTransition();
      }}
    />
  </Swiper>
);

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

export class CBTOnBoardingScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    recordScreenCallOnFocus(this.props.navigation, "intro");
  }

  stopOnBoarding = () => {
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);
    stats.endedOnboarding();
    this.props.navigation.pop();
  };

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
        <GotIt onPress={this.stopOnBoarding} />
      </Swiper>
    );
  }
}
