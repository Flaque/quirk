import React from "react";
import { StyleSheet, View, Button, AsyncStorage } from "react-native";
import {
  Row,
  GrayContainer,
  FormContainer,
  Header,
  SubHeader,
  RoundedInput,
  RoundedSelector
} from "./ui";

const uuidv4 = require("uuid/v4");

const KEY = "@Quirk:items";

function getKey(info) {
  return `@Quirk:thoughts:${info}`;
}

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
    this._getExercises().then(console.log);
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

    this._saveExercise(
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought
    ).then(() => {
      this.setState(defaultState);
    });
  };

  _saveExercise = async (
    automaticThought,
    cognitiveDistortions,
    challenge,
    alternativeThought
  ) => {
    const thought = {
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      uuid: getKey(uuidv4())
    };

    console.log(thought);

    try {
      await AsyncStorage.setItem(thought.uuid, JSON.stringify(thought));
    } catch (error) {
      console.error(error);
    }
  };

  _getExercises = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return AsyncStorage.multiGet(keys);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Row flexGrow={1}>
          <Header>quirk.</Header>
        </Row>

        <GrayContainer flexGrow={6}>
          <FormContainer>
            <SubHeader>Automatic Thought</SubHeader>
            <RoundedInput
              placeholder={"What's going on?"}
              value={this.state.automaticThought}
              onChangeText={text => this.onTextChange("automaticThought", text)}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Cognitive Distortion</SubHeader>
            <RoundedSelector
              style={{
                height: 200
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 50
  }
});
