import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { SubHeader, Paragraph, ThoughtDook, I, Header, IconButton } from "./ui";
import { ScrollView, View } from "react-native";
import { Constants } from "expo";
import theme from "./theme";
import { CBT_FORM_SCREEN } from "./screens";
import i18n from "./i18n";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const PurpleDook = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require(`../assets/purple/Dook.png`)}
  />
);

const YellowDook = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require(`../assets/yellow/Dook.png`)}
  />
);

const PinkDook = () => (
  <ThoughtDook
    style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
    source={require(`../assets/pink/Dook.png`)}
  />
);

const ThoughtView = ({ children, color = "yellow" }) => {
  const dooks = {
    purple: <PurpleDook />,
    yellow: <YellowDook />,
    pink: <PinkDook />,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 12,
        paddingRight: 48,
      }}
    >
      {dooks[color]}
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
};

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

    <ThoughtView>{i18n.t("all_or_nothing_thinking_thought")}</ThoughtView>
  </Distortion>
);

const Catastrophizing = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("catastrophizing")} {"🤯"}
    </SubHeader>

    <Paragraph>{i18n.t("catastrophizing_explanation")}</Paragraph>

    <ThoughtView color="purple">
      {i18n.t("catastrophizing_thought")}
    </ThoughtView>
  </Distortion>
);

const EmotionalReasoning = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("emotional_reasoning")} {"🎭"}
    </SubHeader>

    <Paragraph>
      {i18n.t("emotional_reasoning_explaination_1")} {"\n"}
    </Paragraph>

    <Paragraph>{i18n.t("emotional_reasoning_explaination_2")}</Paragraph>

    <ThoughtView color="pink">
      {i18n.t("emotional_reasoning_thought")}
    </ThoughtView>
  </Distortion>
);

const FortuneTelling = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("fortune_telling")} {"🔮"}
    </SubHeader>

    <Paragraph>{i18n.t("fortune_telling_explanation")}</Paragraph>

    <ThoughtView color="purple">
      {i18n.t("fortune_telling_thought")}
    </ThoughtView>
  </Distortion>
);

const Labeling = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("labeling")} {"🏷"}
    </SubHeader>

    <Paragraph>{i18n.t("labeling_explanation")}</Paragraph>

    <ThoughtView>{i18n.t("labeling_thought")}</ThoughtView>
  </Distortion>
);

const MagnificationOfTheNegative = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("magnification_of_the_negative")} {"👎"}
    </SubHeader>

    <Paragraph>{i18n.t("magnification_of_the_negative_explanation")}</Paragraph>

    <ThoughtView>{i18n.t("magnification_of_the_negative_thought")}</ThoughtView>
  </Distortion>
);

const MindReading = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("mind_reading")} {"🧠"}
    </SubHeader>

    <Paragraph>{i18n.t("mind_reading_explanation")}</Paragraph>

    <ThoughtView color="pink">{i18n.t("mind_reading_thought")}</ThoughtView>
  </Distortion>
);

const MimizationOfThePositive = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("minimization_of_the_positive")} {"👍"}
    </SubHeader>

    <Paragraph>{i18n.t("minimization_of_the_positive_explanation")}</Paragraph>

    <ThoughtView>{i18n.t("minimization_of_the_positive_thought")}</ThoughtView>
  </Distortion>
);

const OtherBlaming = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("other_blaming")} {"🦹‍"}
    </SubHeader>

    <Paragraph>
      {i18n.t("other_blaming_explanation_1")} {`\n`}
    </Paragraph>

    <Paragraph>{i18n.t("other_blaming_explanation_2")}</Paragraph>

    <ThoughtView color="purple">{i18n.t("other_blaming_thought")}</ThoughtView>
  </Distortion>
);

const OverGeneralization = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("over_generalization")} {"👯‍"}
    </SubHeader>

    <Paragraph>{i18n.t("over_generalization_explanation")}</Paragraph>

    <ThoughtView>{i18n.t("over_generalization_thought")}</ThoughtView>
  </Distortion>
);

const SelfBlaming = () => (
  <Distortion>
    <SubHeader>
      {i18n.t("self_blaming")}
      {"👁"}
    </SubHeader>

    <Paragraph>{i18n.t("self_blaming_explanation")}</Paragraph>

    <ThoughtView color="pink">{i18n.t("self_blaming_thought")}</ThoughtView>
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

    <ThoughtView>{i18n.t("should_statements_thought")}</ThoughtView>
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
          marginTop: Constants.statusBarHeight,
          paddingTop: 24,
          paddingLeft: 24,
          paddingRight: 24,
          backgroundColor: "white",
        }}
      >
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
            <Header>quirk.</Header>
            <IconButton
              featherIconName={"edit"}
              onPress={() => this.props.navigation.navigate(CBT_FORM_SCREEN)}
            />
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
