import React from "react";
import { Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import theme from "../theme";
import {
  MediumHeader,
  HintHeader,
  ActionButton,
  Row,
  GhostButton,
} from "../ui";
import { newPopsUp, newFadesIn } from "../animations";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import { TextInput } from "react-native-gesture-handler";
import { textInputStyle } from "./textInputStyle";
import { textInputPlaceholderColor } from "../form/textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";
import haptic from "../haptic";
import { Haptic } from "expo";

const MaxFadeIn = newFadesIn({
  maxOpacity: 0.5,
});

const BackgroundOverlay = ({ isVisible, onPress }) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    style={{
      height: Dimensions.get("screen").height,
      width: Dimensions.get("screen").width,
    }}
  >
    <MaxFadeIn
      style={{
        position: "absolute",
        zIndex: 2,
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: theme.veryLightText,
      }}
      pose={isVisible ? "visible" : "hidden"}
    />
  </TouchableWithoutFeedback>
);

export const THOUGHT_CARD_HIDDEN_HEIGHT = 256;

const CardPopsUp = newPopsUp({
  fullHeight: Dimensions.get("screen").height * 0.8,
  hiddenHeight: THOUGHT_CARD_HIDDEN_HEIGHT,
  popUpScale: 1.1,
});

export default class ThoughtCard extends React.Component<{
  style?: any;
  onNext: (alternativeThought: string) => void;
  shouldFadeInBackgroundOverlay: boolean;
}> {
  state = {
    shouldFadeInBackgroundOverlay: false,
    view: "hidden",
    alternativeThought: "",
  };

  private textInputRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ view: "hiddenWiggle" });
    }, 350);
  }

  popUp = () => {
    this.setState({
      view: "peak",
    });
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.textInputRef.current.focus();

    // Trigger the fade-in effect of the background overlay
    setTimeout(() => {
      this.setState({
        shouldFadeInBackgroundOverlay: true,
      });
    }, 200);
  };

  popDown = () => {
    Keyboard.dismiss();
    this.setState({
      view: "hidden",
      shouldFadeInBackgroundOverlay: false,
    });
  };

  render() {
    const { style } = this.props;
    const { view, shouldFadeInBackgroundOverlay } = this.state;

    return (
      <>
        {view !== "hiddenWiggle" && view !== "hidden" && (
          <BackgroundOverlay
            isVisible={shouldFadeInBackgroundOverlay}
            onPress={this.popDown}
          />
        )}
        <TouchableWithoutFeedback onPress={this.popUp}>
          <CardPopsUp
            style={{
              position: "absolute",
              width: "100%",
              padding: 24,
              bottom: -TAB_BAR_HEIGHT,
              borderRadius: 13,
              backgroundColor: "white",
              borderColor: theme.lightGray,
              borderWidth: 2,
              shadowColor: theme.gray,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 10,
              shadowOpacity: 0.8,
              opacity: 1,
              zIndex: 99,
              ...style,
            }}
            pose={this.state.view}
          >
            <MediumHeader>Automatic Thought</MediumHeader>
            <HintHeader>
              What's the situation and what's your first thought?
            </HintHeader>
            <TextInput
              ref={this.textInputRef}
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
              value={this.state.alternativeThought}
              multiline={true}
              numberOfLines={6}
              onChangeText={txt => {
                this.setState({
                  alternativeThought: txt,
                });
              }}
              onFocus={() => {
                this.setState({
                  view: "peak",
                });
              }}
              onBlur={() => stats.userFilledOutFormField("automatic")}
            />

            <Row
              style={{
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <ActionButton
                title={"Next"}
                onPress={() => this.props.onNext(this.state.alternativeThought)}
                style={{
                  flex: 1,
                }}
              />
            </Row>
          </CardPopsUp>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
