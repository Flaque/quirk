import React from "react";
import { View, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { get } from "lodash";
import { Container, Row, Header, RoundedButton, IconButton } from "./ui";
import {
  saveExercise,
  exists,
  setIsExistingUser,
  getIsExistingUser,
} from "./store";
import theme from "./theme";
import { CBT_LIST_SCREEN, EXPLANATION_SCREEN } from "./screens";
import CBTForm from "./CBTForm";
import { Thought, SavedThought, newThought } from "./thoughts";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import universalHaptic from "./haptic";
import { AppLoading, Haptic, Constants } from "expo";
import CBTView from "./CBTView";
import CBTOnBoardingScreen from "./CBTOnBoardingScreen";
import i18n from "./i18n";

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
      <CBTView thought={thought} />

      <Row>
        <RoundedButton
          fillColor="transparent"
          textColor={theme.blue}
          title={i18n.t("cbt_form.edit")}
          onPress={() => onEdit(thought.uuid)}
          disabled={false}
        />
        <RoundedButton
          title={i18n.t("cbt_form.new")}
          onPress={onNew}
          disabled={false}
        />
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
  shouldShowOnBoarding: boolean;
  isLoading: boolean;
}

export default class CBTFormScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    thought: newThought(),
    isEditing: true,
    shouldShowOnBoarding: false,
    isLoading: true,
  };

  constructor(props) {
    super(props);

    this.props.navigation.addListener("willFocus", async payload => {
      // We've come from a list item
      const thought = get(payload, "state.params.thought", false);
      if (thought && thought.uuid) {
        this.setState({ thought, isEditing: false });
        return;
      }

      // We've come from the form-button back to an existing view
      if (!this.state.isEditing) {
        // Wipe the item if it doesn't exist
        const thoughtExists = await exists(
          (this.state.thought as SavedThought).uuid
        );

        if (!thoughtExists) {
          this.setState({ thought: newThought(), isEditing: true });
        }
      }
    });

    getIsExistingUser().then(isExisting => {
      this.setState({ shouldShowOnBoarding: !isExisting, isLoading: false });
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
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);

    saveExercise(this.state.thought).then(thought => {
      this.setState({ isEditing: false, thought });
    });
  };

  onNew = (): void => {
    universalHaptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.setEmptyThought();
  };

  onEdit = (): void => {
    universalHaptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.setState({ isEditing: true });
  };

  // Toggles Cognitive Distortion when selected
  onSelectCognitiveDistortion = (text: string): void => {
    universalHaptic.selection(); // iOS users get a selected buzz

    this.setState(prevState => {
      const { cognitiveDistortions } = prevState.thought;
      const index = cognitiveDistortions.findIndex(({ slug }) => slug === text);

      cognitiveDistortions[index].selected = !cognitiveDistortions[index]
        .selected;
      return { cognitiveDistortions, ...prevState };
    });
  };

  stopOnBoarding = () => {
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);
    setIsExistingUser();

    this.setState({ shouldShowOnBoarding: false });
  };

  render() {
    const { thought, isEditing, shouldShowOnBoarding, isLoading } = this.state;

    if (isLoading) {
      return <AppLoading onError={console.warn} />;
    }

    if (shouldShowOnBoarding) {
      return <CBTOnBoardingScreen toFormScreen={this.stopOnBoarding} />;
    }

    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
        }}
      >
        <KeyboardAwareScrollView
          style={{
            backgroundColor: theme.lightOffwhite,
            marginTop: Constants.statusBarHeight,
            paddingTop: 24,
          }}
          scrollEnabled
          enableOnAndroid={true}
          extraScrollHeight={128}
        >
          <StatusBar barStyle="dark-content" />
          <Container>
            <Row>
              <IconButton
                featherIconName={"help-circle"}
                accessibilityLabel={i18n.t("accessibility.help_button")}
                onPress={() =>
                  this.props.navigation.navigate(EXPLANATION_SCREEN)
                }
              />
              <Header>quirk</Header>
              <IconButton
                accessibilityLabel={i18n.t("accessibility.list_button")}
                featherIconName={"list"}
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
      </View>
    );
  }
}
