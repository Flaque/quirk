import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { SubHeader, Paragraph, Header, IconButton, GhostButton } from "./ui";
import { ScrollView, View, StatusBar } from "react-native";
import * as Haptic from "expo-haptics";
import Constants from "expo-constants";
import theme from "./theme";
import { CBT_ON_BOARDING_SCREEN } from "./screens";
import i18n from "./i18n";
import { BubbleThought } from "./imgs/Bubbles";
import { recordScreenCallOnFocus } from "./navigation";
import haptic from "./haptic";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

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
      {i18n.t("all_or_nothing_thinking")} {"🌓"}
    </SubHeader>

    <Paragraph>{i18n.t("all_or_nothing_thinking_explanation")}</Paragraph>

    <BubbleThought>{i18n.t("all_or_nothing_thinking_thought")}</BubbleThought>
  </Distortion>
);

const Catastrophizing = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("catastrophizing")} {"🤯"}
    </SubHeader>

    <Paragraph>{i18n.t("catastrophizing_explanation")}</Paragraph>

    <BubbleThought color="purple">
      {i18n.t("catastrophizing_thought")}
    </BubbleThought>
  </Distortion>
);

const EmotionalReasoning = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("emotional_reasoning")} {"🎭"}
    </SubHeader>

    <Paragraph>
      {i18n.t("emotional_reasoning_explanation_1")} {"\n"}
    </Paragraph>

    <Paragraph>{i18n.t("emotional_reasoning_explanation_2")}</Paragraph>

    <BubbleThought color="pink">
      {i18n.t("emotional_reasoning_thought")}
    </BubbleThought>
  </Distortion>
);

const FortuneTelling = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("fortune_telling")} {"🔮"}
    </SubHeader>

    <Paragraph>{i18n.t("fortune_telling_explanation")}</Paragraph>

    <BubbleThought color="purple">
      {i18n.t("fortune_telling_thought")}
    </BubbleThought>
  </Distortion>
);

const Labeling = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("labeling")} {"🏷"}
    </SubHeader>

    <Paragraph>{i18n.t("labeling_explanation")}</Paragraph>

    <BubbleThought>{i18n.t("labeling_thought")}</BubbleThought>
  </Distortion>
);

const MagnificationOfTheNegative = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("magnification_of_the_negative")} {"👎"}
    </SubHeader>

    <Paragraph>{i18n.t("magnification_of_the_negative_explanation")}</Paragraph>

    <BubbleThought>
      {i18n.t("magnification_of_the_negative_thought")}
    </BubbleThought>
  </Distortion>
);

const MindReading = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("mind_reading")} {"🧠"}
    </SubHeader>

    <Paragraph>{i18n.t("mind_reading_explanation")}</Paragraph>

    <BubbleThought color="pink">{i18n.t("mind_reading_thought")}</BubbleThought>
  </Distortion>
);

const MimizationOfThePositive = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("minimization_of_the_positive")} {"👍"}
    </SubHeader>

    <Paragraph>{i18n.t("minimization_of_the_positive_explanation")}</Paragraph>

    <BubbleThought>
      {i18n.t("minimization_of_the_positive_thought")}
    </BubbleThought>
  </Distortion>
);

const OtherBlaming = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("other_blaming")} {"🧛‍"}
    </SubHeader>

    <Paragraph>
      {i18n.t("other_blaming_explanation_1")} {`\n`}
    </Paragraph>

    <Paragraph>{i18n.t("other_blaming_explanation_2")}</Paragraph>

    <BubbleThought color="purple">
      {i18n.t("other_blaming_thought")}
    </BubbleThought>
  </Distortion>
);

const OverGeneralization = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("over_generalization")} {"👯‍"}
    </SubHeader>

    <Paragraph>{i18n.t("over_generalization_explanation")}</Paragraph>

    <BubbleThought>{i18n.t("over_generalization_thought")}</BubbleThought>
  </Distortion>
);

const SelfBlaming = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("self_blaming")}
      {"👁"}
    </SubHeader>

    <Paragraph>{i18n.t("self_blaming_explanation")}</Paragraph>

    <BubbleThought color="pink">{i18n.t("self_blaming_thought")}</BubbleThought>
  </Distortion>
);

const ShouldStatements = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("should_statements")} {"✨"}
    </SubHeader>

    <Paragraph>
      {i18n.t("should_statements_explanation_1")} {"\n"}
    </Paragraph>

    <Paragraph>{i18n.t("should_statements_explanation_2")}</Paragraph>

    <BubbleThought>{i18n.t("should_statements_thought")}</BubbleThought>
  </Distortion>
);

class ExplanationScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    recordScreenCallOnFocus(this.props.navigation, "help");
  }

  navigateToOnboardingScreen = () => {
    this.props.navigation.navigate(CBT_ON_BOARDING_SCREEN);
  };

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: "white",
          paddingTop: Constants.statusBarHeight + 24,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <StatusBar barStyle="dark-content" hidden={false} />
        <View
          style={{
            marginBottom: Constants.statusBarHeight + 24,
          }}
        >
          <View
            style={{
              marginBottom: 24,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {__DEV__ && (
                <View
                  style={{
                    marginRight: 8,
                  }}
                >
                  <GhostButton
                    title="Intro"
                    width={80}
                    height={48}
                    borderColor={theme.lightGray}
                    textColor={theme.veryLightText}
                    onPress={this.navigateToOnboardingScreen}
                  />
                </View>
              )}
            </View>
          </View>

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
