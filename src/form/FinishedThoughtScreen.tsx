import React from "react";
import { Container, Row, Header, IconButton } from "../ui";
import { View, StatusBar } from "react-native";
import { NavigationScreenProp, NavigationAction } from "react-navigation";
import theme from "../theme";
import { Constants, Haptic } from "expo";
import i18n from "../i18n";
import FinishedThoughtView from "./FinishedThoughtView";
import { SavedThought } from "../thoughts";
import haptic from "../haptic";
import { CBT_FORM_SCREEN } from "../screens";
import { Slides } from "./FormView";

interface ScreenProps {
  navigation: NavigationScreenProp<any, NavigationAction>;
}

interface ScreenState {
  thought: SavedThought;
}

export default class extends React.Component<ScreenProps, ScreenState> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      // @ts-ignore argle bargle typescript plz don't do these things
      thought: this.props.navigation.getParam("thought"),
    };
  }

  onEdit = (_: string, slide: Slides) => {
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought: this.state.thought,
      slide,
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
        }}
      >
        <StatusBar barStyle="dark-content" />
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
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <Header allowFontScaling={false}>quirk</Header>
            <IconButton
              accessibilityLabel={i18n.t("accessibility.close_button")}
              featherIconName={"x"}
              onPress={() => {
                haptic.impact(Haptic.ImpactFeedbackStyle.Light);
                this.props.navigation.navigate(CBT_FORM_SCREEN, {
                  clear: true,
                });
              }}
            />
          </Row>

          <FinishedThoughtView
            thought={this.state.thought}
            onEdit={this.onEdit}
            onNew={() => {
              haptic.impact(Haptic.ImpactFeedbackStyle.Light);
              this.props.navigation.navigate(CBT_FORM_SCREEN, {
                clear: true,
              });
            }}
          />
        </Container>
      </View>
    );
  }
}
