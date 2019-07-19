import React from "react";
import ScreenProps from "../ScreenProps";
import { get } from "lodash";
import { MediumHeader, HintHeader, Container, RoundedSelector } from "../ui";
import Constants from "expo-constants";
import { CognitiveDistortion } from "../distortions";

export default class DistortionScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    automaticThought: "",
  };

  constructor(props) {
    super(props);
    this.props.navigation.addListener("didFocus", args => {
      const automaticThought = get(
        args,
        "state.params.automaticThought",
        "🤷‍"
      );
      this.setState({
        automaticThought,
      });
    });
  }

  render() {
    return (
      <Container
        style={{
          marginTop: Constants.statusBarHeight,
        }}
      >
        <MediumHeader>Cognitive Distortions</MediumHeader>
        <HintHeader>Is this thought logical?</HintHeader>

        <RoundedSelector items={[]} onPress={this.onPressSlug} />
      </Container>
    );
  }
}
