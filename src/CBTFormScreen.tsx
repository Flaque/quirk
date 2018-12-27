import React from "react";
import { View, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { get } from "lodash";
import {
  Container,
  FormContainer,
  SubHeader,
  Row,
  Header,
  RoundedButton,
  IconButton,
  Paragraph,
} from "./ui";
import { saveExercise } from "./store";
import theme from "./theme";
import { CBT_LIST_SCREEN } from "./screens";
import CBTForm from "./CBTForm";
import { Thought, SavedThought, newThought } from "./thoughts";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { Haptic } from "expo";

const cognitiveDistortionsToText = cognitiveDistortions => {
  const text = cognitiveDistortions
    .filter(distortion => distortion.selected) // Only take selected items
    .map(({ label }) => `• ${label}`) // format as "• All or Nothing Thinking"
    .join("\n")
    .trim(); // Remove excess whitespace
  return text;
};

const CBTViewer = ({ thought, onEdit, onNew }) => {
  if (!thought.uuid) {
    console.error("Viewing something that's not saved");
  }

  return (
    <View
      style={{
        marginTop: 18,
      }}
    >
      <FormContainer>
        <SubHeader>Automatic Thought</SubHeader>
        <Paragraph>{thought.automaticThought || "🤷‍"}</Paragraph>
      </FormContainer>

      <FormContainer>
        <SubHeader>Cognitive Distortion</SubHeader>
        <Paragraph>
          {cognitiveDistortionsToText(thought.cognitiveDistortions) || "🤷‍"}
        </Paragraph>
      </FormContainer>

      <FormContainer>
        <SubHeader>Challenge</SubHeader>
        <Paragraph>{thought.challenge || "🤷‍"}</Paragraph>
      </FormContainer>

      <FormContainer>
        <SubHeader>Alternative Thought</SubHeader>
        <Paragraph>{thought.alternativeThought || "🤷‍"}</Paragraph>
      </FormContainer>

      <Row>
        <RoundedButton
          fillColor="transparent"
          textColor={theme.blue}
          title="Edit"
          onPress={() => onEdit(thought.uuid)}
          disabled={false}
        />
        <RoundedButton title="New" onPress={() => onNew()} disabled={false} />
      </Row>
    </View>
  );
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface State {
  thought: Thought | SavedThought;
  isEditing: boolean;
}

export default class CBTFormScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: newThought(),
    isEditing: true,
  };

  constructor(props) {
    super(props);

    this.props.navigation.addListener("willFocus", payload => {
      const thought = get(payload, "state.params.thought", false);
      if (thought) {
        this.setState({ thought, isEditing: false });
      }
    });
  }

  setEmptyThought = (): void => {
    this.setState({ thought: newThought(), isEditing: true });
  };

  onTextChange = (key: string, text: string): void => {
    this.setState(prevState => {
      prevState.thought[key] = text;
      return prevState;
    });
  };

  onSave = (): void => {
    // Ignore the typescript error here, it's because of an Expo bug
    Haptic.notification(Haptic.NotificationFeedbackType.Success);

    saveExercise(this.state.thought).then(thought => {
      this.setState({ isEditing: false, thought });
    });
  };

  onNew = (): void => {
    this.setEmptyThought();
  };

  onEdit = (): void => {
    this.setState({ isEditing: true });
  };

  // Toggles Cognitive Distortion when selected
  onSelectCognitiveDistortion = (text: string): void => {
    Haptic.selection(); // iOS users get a selected buzz

    this.setState(prevState => {
      const { cognitiveDistortions } = prevState.thought;
      const index = cognitiveDistortions.findIndex(({ slug }) => slug === text);

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;
      return { cognitiveDistortions, ...prevState };
    });
  };

  render() {
    const { thought, isEditing } = this.state;

    return (
      <KeyboardAwareScrollView
        style={{
          backgroundColor: theme.lightOffwhite,
        }}
        scrollEnabled
      >
        <StatusBar barStyle="dark-content" />
        <Container>
          <Row>
            <Header>quirk.</Header>
            <IconButton
              featherIconName={"menu"}
              onPress={() => this.props.navigation.navigate(CBT_LIST_SCREEN)}
            />
          </Row>

          {isEditing ? (
            <CBTForm
              thought={thought}
              onTextChange={this.onTextChange}
              onSelectCognitiveDistortion={this.onSelectCognitiveDistortion}
              onSave={this.onSave}
            />
          ) : (
            <CBTViewer
              thought={thought}
              onNew={this.onNew}
              onEdit={this.onEdit}
            />
          )}
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
