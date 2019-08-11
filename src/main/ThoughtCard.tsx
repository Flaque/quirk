import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
} from "react-native";
import theme from "../theme";
import { MediumHeader, HintHeader, ActionButton, Row, IconButton } from "../ui";
import { newPopsUp, newFadesIn, FadesIn } from "../animations";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import { TextInput } from "react-native-gesture-handler";
import { textInputStyle, textInputPlaceholderColor } from "../textInputStyle";
import i18n from "../i18n";
import * as stats from "../stats";

import { Thought } from "../thoughts";
import haptic from "../haptic";

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

export const THOUGHT_CARD_HIDDEN_HEIGHT = 278;

const CardPopsUp = newPopsUp({
  fullHeight: Dimensions.get("screen").height * 0.86,
  hiddenHeight: THOUGHT_CARD_HIDDEN_HEIGHT,
  popUpScale: 1.1,
});

export default class ThoughtCard extends React.Component<
  {
    onNext: (thought: Thought) => void;
    onFinish: (thought: Thought) => void;
    onChange: (txt: string) => void;
    onPopUp: () => void;
    onPopDown: () => void;
    isEditing: boolean;
    thought: Thought;
    style?: any;
    cardPosition: "hidden" | "hiddenWiggle" | "peak" | "full";
    shouldFadeInBackgroundOverlay: boolean;
  },
  {
    shouldFadeInBackgroundOverlay: boolean;
  }
> {
  private textInputRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // If we just switched to editing, focus the input
    if (!prevProps.isEditing && this.props.isEditing) {
      this.textInputRef.current.focus();
    }
  }

  popUp = () => {
    haptic.selection();
    this.textInputRef.current.focus();
    this.props.onPopUp();
  };

  render() {
    const {
      style,
      isEditing,
      cardPosition,
      shouldFadeInBackgroundOverlay,
    } = this.props;

    return (
      <>
        {cardPosition !== "hiddenWiggle" && cardPosition !== "hidden" && (
          <BackgroundOverlay
            isVisible={shouldFadeInBackgroundOverlay}
            onPress={this.props.onPopDown}
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
              flex: 1,
              ...style,
            }}
            pose={this.props.cardPosition}
          >
            <KeyboardAvoidingView
              behavior="position"
              style={{
                paddingBottom: 24,
              }}
            >
              <Row>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <MediumHeader>{i18n.t("auto_thought")}</MediumHeader>
                  <HintHeader>What's going on?</HintHeader>
                </View>

                <FadesIn
                  pose={
                    cardPosition === "peak" || cardPosition === "full"
                      ? "visible"
                      : "hidden"
                  }
                >
                  <IconButton
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: 24,
                    }}
                    accessibilityLabel={"close"}
                    featherIconName="x"
                    onPress={this.props.onPopDown}
                  />
                </FadesIn>
              </Row>
              <TextInput
                ref={this.textInputRef}
                style={textInputStyle}
                placeholderTextColor={textInputPlaceholderColor}
                placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
                value={
                  this.props.thought ? this.props.thought.automaticThought : ""
                }
                multiline={true}
                numberOfLines={6}
                onChangeText={this.props.onChange}
                onFocus={this.props.onPopUp}
                onBlur={() => stats.userFilledOutFormField("automatic")}
              />

              <Row
                style={{
                  marginTop: 24,
                  justifyContent: "flex-end",
                }}
              >
                {isEditing ? (
                  <ActionButton
                    title={"Finished"}
                    onPress={() => {
                      this.props.onFinish(this.props.thought);
                    }}
                    style={{
                      flex: 1,
                    }}
                  />
                ) : (
                  <ActionButton
                    title={"Next"}
                    onPress={() => this.props.onNext(this.props.thought)}
                    style={{
                      flex: 1,
                    }}
                  />
                )}
              </Row>
            </KeyboardAvoidingView>
          </CardPopsUp>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
