import React from "react";
import { Button, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Container,
  GrayContainer,
  FormContainer,
  SubHeader,
  RoundedSelector,
  Row,
  Header
} from "./ui";
import { saveExercise, getExercise } from "./store";
import distortions from "./distortions";
import theme from "./theme";
import { CBT_LIST_SCREEN } from "./screens";
import { Feather } from "@expo/vector-icons";
import { get } from "lodash";

const emptyThought = {
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
  borderColor: theme.veryLightText,
  borderWidth: 3
};
const textInputPlaceholderColor = theme.veryLightText;

class CBTForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.challenge = React.createRef();
    this.alternative = React.createRef();
  }

  render() {
    const {
      onTextChange,
      onSelectCognitiveDistortion,
      onSave,
      thought
    } = this.props;

    return (
      <KeyboardAwareScrollView scrollEnabled={false}>
        <GrayContainer flexGrow={6}>
          <FormContainer>
            <SubHeader>Automatic Thought</SubHeader>
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"What's going on?"}
              value={thought.automaticThought}
              onChangeText={text => onTextChange("automaticThought", text)}
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
              options={thought.cognitiveDistortions}
              onPress={onSelectCognitiveDistortion}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Challenge</SubHeader>
            <TextInput
              style={textInputStyle}
              placeholderTextColor={textInputPlaceholderColor}
              placeholder={"Debate that thought!"}
              value={thought.challenge}
              onChangeText={text => onTextChange("challenge", text)}
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
              value={thought.alternativeThought}
              onChangeText={text => onTextChange("alternativeThought", text)}
              returnKeyType="done"
              ref={this.alternative}
            />
          </FormContainer>

          <FormContainer>
            <Button title={"Save"} onPress={onSave} />
          </FormContainer>
        </GrayContainer>
      </KeyboardAwareScrollView>
    );
  }
}

export default class CBTFormScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = { thought: emptyThought };

    this.props.navigation.addListener("willFocus", payload => {
      const thought = get(payload, "state.params.thought", false);
      if (thought) {
        this.setState({ thought: thought });
      }
    });
  }

  onTextChange = (key, text) => {
    this.setState(prevState => {
      prevState.thought[key] = text;
      return prevState;
    });
  };

  onSave = () => {
    const {
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought
    } = this.state.thought;

    saveExercise(
      automaticThought,
      cognitiveDistortions,
      challenge,
      alternativeThought
    ).then(() => {
      this.setState({ thought: emptyThought });
    });
  };

  // Toggles Cognitive Distortion when selected
  onSelectCognitiveDistortion = text => {
    this.setState(prevState => {
      const { cognitiveDistortions } = prevState.thought;
      const index = cognitiveDistortions.findIndex(
        ({ label }) => label == text
      );

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;
      return { cognitiveDistortions, ...prevState };
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Header>quirk.</Header>
          <TouchableOpacity
            style={{
              backgroundColor: theme.offwhite,
              height: 48,
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12",
              alignSelf: "center"
            }}
            onPress={() => this.props.navigation.navigate(CBT_LIST_SCREEN)}
          >
            <Feather name="menu" size={24} color={theme.veryLightText} />
          </TouchableOpacity>
        </Row>

        <Row>
          <CBTForm
            thought={this.state.thought}
            onTextChange={this.onTextChange}
            onSelectCognitiveDistortion={this.onSelectCognitiveDistortion}
            onSave={this.onSave}
          />
        </Row>
      </Container>
    );
  }
}
