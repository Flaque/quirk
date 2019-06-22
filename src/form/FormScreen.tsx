import {
  Container,
  Row,
  Header,
  IconButton,
  SubHeader,
  Paragraph,
  RoundedSelector,
} from "../ui";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { View, TextInput } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import theme from "../theme";
import { Constants } from "expo";
import { sliderWidth, itemWidth } from "./sizes";
import i18n from "../i18n";
import { CBT_LIST_SCREEN, EXPLANATION_SCREEN } from "../screens";
import * as flagstore from "../flagstore";
import { newThought } from "../thoughts";
import { Thought } from "../thoughts";
import { CognitiveDistortion } from "../distortions";
import universalHaptic from "../haptic";

const textInputStyle = {
  height: 156,
  backgroundColor: "white",
  padding: 12,
  paddingTop: 14,
  borderRadius: 8,
  fontSize: 16,
  borderColor: theme.lightGray,
  borderWidth: 1,
  color: theme.darkText,
};
const textInputPlaceholderColor = theme.veryLightText;

const AutomaticThought = ({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("auto_thought")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Include the situation and the thoughts.
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
      value={value}
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      returnKeyType="next"
      onChangeText={onChange}
      onSubmitEditing={onNext}
    />
  </View>
);

const Challenge = ({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}) => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("challenge")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Be truthful, honest, and open.
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
      value={value}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={onChange}
      onSubmitEditing={onNext}
    />
  </View>
);

const AlternativeThought = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("alt_thought")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      What could we think instead?
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
      value={value}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={onChange}
    />
  </View>
);

const Distortions = ({
  distortions = [],
  onChange,
}: {
  distortions: CognitiveDistortion[];
  onChange: (slug: string) => void;
}) => (
  <ScrollView>
    <View>
      <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
      <RoundedSelector items={distortions} onPress={onChange} />
    </View>
  </ScrollView>
);

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface FormScreenState {
  thought: Thought;
  activeSlide: number;
}

export default class extends React.Component<ScreenProps, FormScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: newThought(),
    activeSlide: 0,
  };

  _carousel = null;

  onChangeAutomaticThought = val => {
    this.setState(prevState => {
      prevState.thought.automaticThought = val;
      return prevState;
    });
  };

  onChangeChallenge = (val: string) => {
    this.setState(prevState => {
      prevState.thought.challenge = val;
      return prevState;
    });
  };

  onChangeAlternativeThought = (val: string) => {
    this.setState(prevState => {
      prevState.thought.alternativeThought = val;
      return prevState;
    });
  };

  onChangeDistortion = (selected: string) => {
    universalHaptic.selection(); // iOS users get a selected buzz

    this.setState(prevState => {
      const { cognitiveDistortions } = prevState.thought;
      const index = cognitiveDistortions.findIndex(
        ({ slug }) => slug === selected
      );

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;

      prevState.thought.cognitiveDistortions = cognitiveDistortions;
      return prevState;
    });
  };

  _renderItem = ({ item, index }) => {
    const { thought } = this.state;

    if (item.slug === "automatic-thought") {
      return (
        <AutomaticThought
          value={thought.automaticThought}
          onChange={this.onChangeAutomaticThought}
          onNext={() => this._carousel.snapToNext(true)}
        />
      );
    }

    if (item.slug === "distortions") {
      return (
        <Distortions
          distortions={thought.cognitiveDistortions}
          onChange={this.onChangeDistortion}
        />
      );
    }

    if (item.slug === "challenge") {
      return (
        <Challenge
          value={thought.challenge}
          onChange={this.onChangeChallenge}
          onNext={() => this._carousel.snapToNext(true)}
        />
      );
    }

    if (item.slug === "alternative-thought") {
      return (
        <AlternativeThought
          value={thought.alternativeThought}
          onChange={this.onChangeAlternativeThought}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
        }}
      >
        <Container
          style={{
            height: "100%",
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: Constants.statusBarHeight,
            paddingTop: 12,
          }}
        >
          <Row
            style={{
              marginBottom: 24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <IconButton
              featherIconName={"help-circle"}
              accessibilityLabel={i18n.t("accessibility.help_button")}
              onPress={() => {
                flagstore.setFalse("start-help-badge").then(() => {
                  this.setState({ shouldShowHelpBadge: false });
                  this.props.navigation.push(EXPLANATION_SCREEN);
                });
              }}
              hasBadge={false}
            />
            <Header allowFontScaling={false}>quirk</Header>
            <IconButton
              accessibilityLabel={i18n.t("accessibility.list_button")}
              featherIconName={"list"}
              onPress={() => this.props.navigation.push(CBT_LIST_SCREEN)}
            />
          </Row>

          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={[
              { slug: "automatic-thought" },
              { slug: "distortions" },
              { slug: "challenge" },
              { slug: "alternative-thought" },
            ]}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
        </Container>
      </View>
    );
  }
}
