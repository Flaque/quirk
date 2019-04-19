import React from "react";
import { TextInput, View, Keyboard } from "react-native";
import {
  FormContainer,
  SubHeader,
  RoundedSelector,
  Row,
  ActionButton,
} from "./ui";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import theme from "./theme";
import { Thought } from "./thoughts";
import i18n from "./i18n";

// Text input styles defined here instead of componentized to
// avoid issues with refs and subcomponents
const textInputStyle = {
  height: 48,
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

export default class CBTForm extends React.Component<Props> {
  challenge: React.RefObject<TextInput>;
  alternative: React.RefObject<TextInput>;

  constructor(props) {
    super(props);

    this.challenge = React.createRef();
    this.alternative = React.createRef();
  }

  render() {
    const {
      onTextChange,
      onSelectCognitiveDistortion,
      onSave,
      thought,
    } = this.props;

    return (
      <View style={{ marginTop: 18 }}>
        <FormContainer>
          <SubHeader>{i18n.t("auto_thought")}</SubHeader>
          <AutoGrowingTextInput
            style={textInputStyle}
            placeholderTextColor={textInputPlaceholderColor}
            placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
            value={thought.automaticThought}
            returnKeyType="next"
            multiline={true}
            blurOnSubmit={true}
            onChangeText={text => onTextChange("automaticThought", text)}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
          <RoundedSelector
            items={thought.cognitiveDistortions}
            onPress={onSelectCognitiveDistortion}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>{i18n.t("challenge")}</SubHeader>
          <AutoGrowingTextInput
            ref={this.challenge}
            blurOnSubmit={false}
            placeholder={i18n.t("cbt_form.changed_placeholder")}
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="next"
            style={textInputStyle}
            value={thought.challenge}
            onSubmitEditing={() => {
              this.alternative.current!.focus();
            }}
            onChangeText={text => {
              // We remove new lines here to avoid weird "enter" key issues
              return onTextChange("challenge", text.replace(/\n|\r/g, ""));
            }}
          />
        </FormContainer>

        <FormContainer>
          <SubHeader>{i18n.t("alt_thought")}</SubHeader>
          <AutoGrowingTextInput
            ref={this.alternative}
            blurOnSubmit={false}
            placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
            placeholderTextColor={textInputPlaceholderColor}
            returnKeyType="done"
            style={textInputStyle}
            value={thought.alternativeThought}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={text =>
              onTextChange("alternativeThought", text.replace(/\n|\r/g, ""))
            }
          />
        </FormContainer>

        <Row style={{ justifyContent: "flex-end" }}>
          <ActionButton
            disabled={false}
            title={i18n.t("cbt_form.save")}
            onPress={onSave}
          />
        </Row>
      </View>
    );
  }
}
