import { ActionButton } from "../ui";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { View } from "react-native";
import { Haptic } from "expo";
import { sliderWidth, itemWidth } from "./sizes";
import { Thought } from "../thoughts";
import universalHaptic from "../haptic";
import AutomaticThought from "./AutomaticThought";
import AlternativeThought from "./AlternativeThought";
import Challenge from "./Challenge";
import Distortions from "./Distortions";
import { saveExercise } from "../thoughtstore";
import * as stats from "../stats";

export type Slides = "automatic" | "distortions" | "challenge" | "alternative";

const slideToIndex = (slide: Slides): number => {
  switch (slide) {
    case "automatic":
      return 0;
    case "distortions":
      return 1;
    case "challenge":
      return 2;
    case "alternative":
      return 3;
  }
};

interface FormViewProps {
  onSave: (thought: Thought) => void;
  initialThought: Thought;
  slideToShow: Slides;
}

interface FormViewState {
  thought: Thought;
  activeSlide: number;
}

export default class extends React.Component<FormViewProps, FormViewState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: this.props.initialThought,
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

  onSave = () => {
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);

    saveExercise(this.state.thought).then(thought => {
      stats.thoughtRecorded();
      this.setState({ thought });
      this.props.onSave(thought);
    });
  };

  _renderItem = ({ item, index }) => {
    const { thought } = this.state;

    if (item.slug === "automatic-thought") {
      return (
        <AutomaticThought
          value={thought.automaticThought}
          onChange={this.onChangeAutomaticThought}
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
        />
      );
    }

    if (item.slug === "alternative-thought") {
      return (
        <>
          <AlternativeThought
            value={thought.alternativeThought}
            onChange={this.onChangeAlternativeThought}
          />

          <View
            style={{
              marginTop: 12,
            }}
          >
            <ActionButton
              title="Save & Finish"
              width="100%"
              onPress={this.onSave}
            />
          </View>
        </>
      );
    }

    return null;
  };

  render() {
    return (
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
        firstItem={slideToIndex(this.props.slideToShow)}
      />
    );
  }
}
