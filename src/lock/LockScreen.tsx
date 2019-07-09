import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { View, StatusBar } from "react-native";
import { Container, Row, Header, GhostButton } from "../ui";
import theme from "../theme";
import { Constants } from "expo";
import posed from "react-native-pose";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const KeypadButton = ({ title }) => (
  <GhostButton
    title={title}
    borderColor={theme.gray}
    textColor={theme.darkText}
    width={BUTTON_SIZE}
    height={BUTTON_SIZE}
    fontSize={18}
    style={{
      backgroundColor: "white",
    }}
  />
);

const PopsUp = posed.View({
  full: { height: 380, paddingTop: 18, paddingBottom: 18 },
  peak: {
    height: 156,
    paddingTop: 18,
    paddingBottom: 18,
    transition: { type: "spring", stiffness: 150 },
  },
  hidden: { height: 0, paddingTop: 0, paddingBottom: 0 },
});

const BUTTON_SIZE = 96;

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    view: "hidden",
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ view: "peak" });
    }, 350);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.pink,
          height: "100%",
        }}
      >
        <StatusBar barStyle="dark-content" />

        <PopsUp>
          <Container
            style={{
              flex: 1,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 24,
              marginTop: Constants.statusBarHeight,
            }}
          >
            <Row
              style={{
                justifyContent: "space-evenly",
                marginBottom: 12,
              }}
            >
              <KeypadButton title="1" />
              <KeypadButton title="2" />
              <KeypadButton title="3" />
            </Row>

            <Row
              style={{
                justifyContent: "space-evenly",
                marginBottom: 12,
              }}
            >
              <KeypadButton title="4" />
              <KeypadButton title="5" />
              <KeypadButton title="6" />
            </Row>

            <Row
              style={{
                justifyContent: "space-evenly",
                marginBottom: 12,
              }}
            >
              <KeypadButton title="7" />
              <KeypadButton title="8" />
              <KeypadButton title="9" />
            </Row>

            <Row
              style={{
                justifyContent: "space-evenly",
              }}
            >
              <KeypadButton title="0" />
            </Row>
          </Container>
        </PopsUp>
      </View>
    );
  }
}
