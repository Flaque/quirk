import React from "react";
import { Button, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GrayContainer, FormContainer, SubHeader, RoundedSelector } from "./ui";
import { saveExercise, getExercise } from "./store";
import distortions from "./distortions";

const defaultState = {
  automaticThought: "",
  cognitiveDistortions: distortions.map(label => {
    return { label, selected: false };
  }),
  challenge: "",
  alternativeThought: ""
};

// Text input styles defined here instead of componentized to
// avoid issues with refs and subcomponents
const textInputStyle = {
  height: 48,
  backgroundColor: "white",
  paddingLeft: 12,
  borderRadius: 12,
  borderColor: "#EEECEC", // Light shadow for subtle contrast
  borderWidth: 1
};
const textInputPlaceholderColor = "#D8D8D8";

export default class CBTForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
    this.challenge = React.createRef();
    this.alternative = React.createRef();
  }

  componentDidMount = () => {
    getExercise();
  };

  // Toggles Cognitive Distortion when selected
  onSelectCognitiveDistortion = text => {
    this.setState(prevState => {
      const { cognitiveDistortions } = prevState;
      const index = cognitiveDistortions.findIndex(
        ({ label }) => label == text
      );

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;
      return { cognitiveDistortions, ...prevState };
    });
  };

  onTextChange = (key, text) => {
    this.setState({ [key]: text });
  };

  onSave = () => {
    const {
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought
    } = this.state;

    saveExercise(
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought
    ).then(() => {
      this.setState(defaultState);
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}>
        <GrayContainer flexGrow={6}>
          <FormContainer>
            <SubHeader>Automatic Thought</SubHeader>
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"What's going on?"}
              value={this.state.automaticThought}
              onChangeText={text => this.onTextChange("automaticThought", text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.challenge.current.focus();
              }}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Cognitive Distortion</SubHeader>
            <RoundedSelector
              style={{
                height: 150
              }}
              options={this.state.cognitiveDistortions}
              onPress={this.onSelectCognitiveDistortion}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Challenge</SubHeader>
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"Debate that thought!"}
              value={this.state.challenge}
              onChangeText={text => this.onTextChange("challenge", text)}
              onSubmitEditing={() => {
                this.alternative.current.focus();
              }}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={this.challenge}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Alternative Thought</SubHeader>
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"What should we think instead?"}
              value={this.state.alternativeThought}
              onChangeText={text =>
                this.onTextChange("alternativeThought", text)
              }
              returnKeyType="done"
              ref={this.alternative}
            />
          </FormContainer>

          <FormContainer>
            <Button title={"Save"} onPress={this.onSave} />
          </FormContainer>
        </GrayContainer>
      </KeyboardAwareScrollView>
    );
  }
}
