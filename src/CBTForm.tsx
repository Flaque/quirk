import React from "react";
import { TextInput, View } from "react-native";
import {
  FormContainer,
  SubHeader,
  RoundedSelector,
  Row,
  RoundedButton,
} from "./ui";
import theme from "./theme";
import { Thought } from "./thoughts";
import { max } from "lodash";

const InputSize = 48;

// Text input styles defined here instead of componentized to
// avoid issues with refs and subcomponents
const textInputStyle = {
  height: InputSize,
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

interface Props {
  thought: Thought;
  onSave: () => void;
  onSelectCognitiveDistortion: (text: string) => void;
  onTextChange: (key: string, text: string) => void;
}

interface State {
  automaticHeight: number;
  challengeHeight: number;
  alternativeHeight: number;
}

export default class CBTForm extends React.Component<Props, State> {
  challenge: React.RefObject<TextInput>;
  alternative: React.RefObject<TextInput>;

  state = {
    automaticHeight: 48,
    challengeHeight: 48,
    alternativeHeight: 48,
  };

  constructor(props) {
    super(props);

    this.challenge = React.createRef();
    this.alternative = React.createRef();
  }

  growAutomatic = height => {
    this.setState({
      automaticHeight: height,
    });
  };

  growChallenge = height => {
    this.setState({
      challengeHeight: height,
    });
  };

  growAlternative = height => {
    this.setState({
      alternativeHeight: height,
    });
  };

  render() {
    const {
      onTextChange,
      onSelectCognitiveDistortion,
      onSave,
      thought,
    } = this.props;

    return (
      <View
        style={{
          marginTop: 18,
        }}
      >
        <FormContainer>
          <SubHeader>Automatic Thought</SubHeader>
          <TextInput
            style={{
              ...textInputStyle,
              height: max([this.state.automaticHeight, InputSize]),
            }}
            placeholderTextColor={textInputPlaceholderColor}
            placeholder={"What's going on?"}
            value={thought.automaticThought}
            returnKeyType="next"
            multiline={true}
            blurOnSubmit={true}
            autoFocus={true}
            onChangeText={text => onTextChange("automaticThought", text)}
            onContentSizeChange={e =>
              this.growAutomatic(e.nativeEvent.contentSize.height)
            }
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Cognitive Distortion</SubHeader>
          <RoundedSelector
            style={{
              height: 150,
            }}
            items={thought.cognitiveDistortions}
            onPress={onSelectCognitiveDistortion}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Challenge</SubHeader>
          <TextInput
            ref={this.challenge}
            blurOnSubmit={false}
            placeholder="Debate that thought!"
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="next"
            style={{
              ...textInputStyle,
              height: max([this.state.challengeHeight, InputSize]),
            }}
            value={thought.challenge}
            multiline={true}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Enter") {
                this.alternative.current!.focus();
                return;
              }
            }}
            enablesReturnKeyAutomatically={true}
            onContentSizeChange={e =>
              this.growChallenge(e.nativeEvent.contentSize.height)
            }
            onChangeText={text => {
              onTextChange("challenge", text.replace(/\n|\r/g, ""));
            }}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>Alternative Thought</SubHeader>
          <TextInput
            ref={this.alternative}
            placeholder="What should we think instead?"
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="done"
            style={{
              ...textInputStyle,
              height: max([this.state.alternativeHeight, InputSize]),
            }}
            multiline={true}
            value={thought.alternativeThought}
            onContentSizeChange={e =>
              this.growAlternative(e.nativeEvent.contentSize.height)
            }
            onChangeText={text => onTextChange("alternativeThought", text)}
          />
        </FormContainer>

        <Row justifyContent="flex-end">
          <RoundedButton disabled={false} title="Save" onPress={onSave} />
        </Row>
      </View>
    );
  }
}
