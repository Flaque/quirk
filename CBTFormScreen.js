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
    this.props.onTextChange({ [key]: text });
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

export default class CBTFormScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = { thought: defaultState };

    this.props.navigation.addListener("willFocus", payload => {
      const thought = get(payload, "state.params.thought", false);
      if (thought) {
        this.setState({ thought: thought });
      }
    });
  }

  // TODO hoist state
  onTextChange = (key, text) => {
    this.setState({ [key]: text });
  };

  render() {
    console.log(this.state);
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
          />
        </Row>
      </Container>
    );
  }
}
