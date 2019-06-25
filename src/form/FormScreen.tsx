import { Container, Row, Header, IconButton } from "../ui";
import React from "react";
import { View, Text } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import theme from "../theme";
import { Constants, Haptic } from "expo";
import i18n from "../i18n";
import { CBT_LIST_SCREEN, EXPLANATION_SCREEN } from "../screens";
import * as flagstore from "../flagstore";
import FormView, { Slides } from "./FormView";
import FinishedThoughtView from "./FinishedThoughtView";
import { SavedThought, Thought, newThought } from "../thoughts";
import { get } from "lodash";
import { exists, getIsExistingUser } from "../thoughtstore";
import haptic from "../haptic";
import { recordScreenCallOnFocus } from "../navigation";
import * as stats from "../stats";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface FormScreenState {
  isEditing: boolean;
  thought?: SavedThought | Thought;
  slideToShow: Slides;
  shouldShowHelpBadge: boolean;
}

export default class extends React.Component<ScreenProps, FormScreenState> {
  static navigationOptions = {
    header: null,
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

    recordScreenCallOnFocus(this.props.navigation, "form");

    getIsExistingUser().then(isExisting => {
      // New Users
      if (!isExisting) {
        stats.newuser();
      }
    });

    flagstore.get("start-help-badge", "true").then(val => {
      this.setState({ shouldShowHelpBadge: val });
    });
  }

  state = {
    isEditing: true,
    thought: newThought(),
    slideToShow: "automatic" as Slides,
    shouldShowHelpBadge: false,
  };

  onSave = thought => {
    this.setState({
      isEditing: false,
      thought,
      slideToShow: "automatic",
    });
  };

  onNew = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.setState({
      isEditing: true,
      thought: newThought(),
    });
  };

  onEdit = (uuid: string, slide: Slides) => {
    this.setState({
      isEditing: true,
      // Start on the closest to where they were
      slideToShow: slide,
    });
  };

  render() {
    const { isEditing, shouldShowHelpBadge } = this.state;

    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
        }}
      >
        <Container
          style={{
            height: "100%",
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: Constants.statusBarHeight,
            paddingTop: 12,
          }}
        >
          <Row
            style={{
              marginBottom: 24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <IconButton
              featherIconName={"help-circle"}
              accessibilityLabel={i18n.t("accessibility.help_button")}
              onPress={() => {
                flagstore.setFalse("start-help-badge").then(() => {
                  this.setState({ shouldShowHelpBadge: false });
                  this.props.navigation.push(EXPLANATION_SCREEN);
                });
              }}
              hasBadge={shouldShowHelpBadge}
            />
            <Header allowFontScaling={false}>quirk</Header>
            <IconButton
              accessibilityLabel={i18n.t("accessibility.list_button")}
              featherIconName={"list"}
              onPress={() => this.props.navigation.push(CBT_LIST_SCREEN)}
            />
          </Row>

          {isEditing ? (
            <FormView
              onSave={this.onSave}
              initialThought={this.state.thought}
              slideToShow={this.state.slideToShow}
            />
          ) : (
            <FinishedThoughtView
              thought={this.state.thought as SavedThought}
              onNew={this.onNew}
              onEdit={this.onEdit}
            />
          )}
        </Container>
      </View>
    );
  }
}
