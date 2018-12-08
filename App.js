import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Row,
  GrayContainer,
  FormContainer,
  Header,
  SubHeader,
  RoundedInput,
  RoundedSelector
} from "./ui";
import { saveExercise, getExercise } from "./store";

// TODO add slugs for these so we can change them in the future
const distortions = [
  "All or Nothing Thinking",
  "Overgeneralization",
  "Filtering out the Positive",
  "Jumping to Conclusions",
  "Mind Reading",
  "Fortune Telling",
  "Magnification of the Negative",
  "Minimization of the Positive",
  "Catastrophizing",
  "Emotional Reasoning",
  "Should Statements",
  "Labeling",
  "Self-Blaming",
  "Other-Blaming"
];

const defaultState = {
  automaticThought: "",
  cognitiveDistortions: distortions.map(label => {
    return { label, selected: false };
  }),
  challenge: "",
  alternativeThought: ""
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  componentDidMount = () => {
    getExercise().then(console.log);
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
      <View style={styles.container}>
        <KeyboardAwareScrollView scrollEnabled={false}>
          <GrayContainer flexGrow={6}>
            <FormContainer>
              <SubHeader>Automatic Thought</SubHeader>
              <RoundedInput
                placeholder={"What's going on?"}
                value={this.state.automaticThought}
                onChangeText={text =>
                  this.onTextChange("automaticThought", text)
                }
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
              <RoundedInput
                placeholder={"Debate that thought!"}
                value={this.state.challenge}
                onChangeText={text => this.onTextChange("challenge", text)}
              />
            </FormContainer>

            <FormContainer>
              <SubHeader>Alternative Thought</SubHeader>
              <RoundedInput
                placeholder={"What should we think instead?"}
                value={this.state.alternativeThought}
                onChangeText={text =>
                  this.onTextChange("alternativeThought", text)
                }
              />
            </FormContainer>

            <FormContainer>
              <Button title={"Save"} onPress={this.onSave} />
            </FormContainer>
          </GrayContainer>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 75,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 50
  }
});
