import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { StatusBar } from "react-native";
import { Container, Row, GhostButton, Header } from "../ui";
import theme from "../theme";
import { Constants } from "expo";
import {
  FadesIn,
  BlueOnActive,
  BigOnActive,
  BiggleOnActive,
  BouncyBigOnActive,
} from "../animations";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const KeypadButton = ({ title, onPress }) => (
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
    onPress={onPress}
  />
);

const Notifier = ({ isActive }) => (
  <BouncyBigOnActive
    style={{
      width: 32,
      height: 32,
      borderRadius: 32,
      backgroundColor: theme.pink,
    }}
    pose={isActive ? "active" : "inactive"}
  />
);

const BUTTON_SIZE = 96;

export default class extends React.Component<
  ScreenProps,
  {
    isReady: boolean;
    code: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    code: "",
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 100);
  }

  onEnterCode = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        code: prevState.code + "0",
      };
    });
  };

  render() {
    const { code } = this.state;
    return (
      <FadesIn
        style={{
          backgroundColor: theme.offwhite,
          height: "100%",
        }}
        pose={this.state.isReady ? "visible" : "hidden"}
      >
        <StatusBar barStyle="dark-content" />
        <Container
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 24,
            marginTop: Constants.statusBarHeight,
            backgroundColor: theme.offwhite,
            justifyContent: "center",
          }}
        >
          <Row
            style={{
              alignSelf: "center",
            }}
          >
            <Header
              style={{
                fontSize: 32,
                marginBottom: 24,
              }}
            >
              Enter your passcode.
            </Header>
          </Row>
        </Container>

        <Container
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 24,
            backgroundColor: "white",
          }}
        >
          <Row
            style={{
              marginLeft: 48,
              marginRight: 48,
              marginBottom: 24,
            }}
          >
            <Notifier isActive={code.length >= 1} />
            <Notifier isActive={code.length >= 2} />
            <Notifier isActive={code.length >= 3} />
            <Notifier isActive={code.length >= 4} />
          </Row>
          <Row
            style={{
              justifyContent: "space-evenly",
              marginBottom: 12,
            }}
          >
            <KeypadButton title="1" onPress={this.onEnterCode} />
            <KeypadButton title="2" onPress={this.onEnterCode} />
            <KeypadButton title="3" onPress={this.onEnterCode} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
              marginBottom: 12,
            }}
          >
            <KeypadButton title="4" onPress={this.onEnterCode} />
            <KeypadButton title="5" onPress={this.onEnterCode} />
            <KeypadButton title="6" onPress={this.onEnterCode} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
              marginBottom: 12,
            }}
          >
            <KeypadButton title="7" onPress={this.onEnterCode} />
            <KeypadButton title="8" onPress={this.onEnterCode} />
            <KeypadButton title="9" onPress={this.onEnterCode} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
            }}
          >
            <KeypadButton title="0" onPress={this.onEnterCode} />
          </Row>
        </Container>
      </FadesIn>
    );
  }
}
