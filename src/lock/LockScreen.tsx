import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { StatusBar, Platform } from "react-native";
import { Container, Row, GhostButton, Header, IconButton } from "../ui";
import theme from "../theme";
import * as Haptic from "expo-haptics";
import Constants from "expo-constants";
import { FadesIn, BouncyBigOnActive } from "../animations";
import { isCorrectPincode, setPincode, getPincode } from "./lockstore";
import { MAIN_SCREEN } from "../screens";
import { get } from "lodash";
import haptic from "../haptic";
import {
  userSetPincode,
  userPromptedForReviewWhenSettingCode,
  userRequestedPincodeReset,
} from "../stats";
import * as StoreReview from "react-native-store-review";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const KeypadButton = ({ title, onPress, style = {} }) => (
  <GhostButton
    title={title}
    borderColor={theme.gray}
    textColor={theme.darkText}
    width={BUTTON_SIZE}
    height={BUTTON_SIZE}
    fontSize={18}
    style={{
      backgroundColor: "white",
      ...style,
    }}
    onPress={onPress}
  />
);

const KeypadSideButton = ({
  icon,
  accessibilityLabel,
  onPress,
  style = {},
}) => (
  <IconButton
    accessibilityLabel={accessibilityLabel}
    featherIconName={icon}
    style={{
      backgroundColor: "white",
      width: BUTTON_SIZE,
      ...style,
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
      borderColor: theme.darkPink,
      borderWidth: 2,
    }}
    pose={isActive ? "active" : "inactive"}
  />
);

const BUTTON_SIZE = 96;

export default class extends React.Component<
  ScreenProps,
  {
    isReady: boolean;
    isSettingCode: boolean;
    code: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    isSettingCode: true,
    code: "",
  };

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", async payload => {
      const isSettingCode = get(payload, "action.params.isSettingCode", false);
      this.setState({
        isSettingCode: isSettingCode,
      });
    });

    this.props.navigation.addListener("didFocus", async payload => {
      const isSettingCode = get(payload, "action.params.isSettingCode", false);
      this.setState({
        isSettingCode: isSettingCode,
      });
    });

    // Purely just for a smooth fade in
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 100);
  }

  onEnterCode = async (key: string) => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    await this.setState(prevState => {
      if (prevState.code.length === 4) {
        return prevState;
      }
      return {
        ...prevState,
        code: prevState.code + key,
      };
    });

    if (this.state.code.length !== 4) {
      return;
    }

    if (this.state.isSettingCode) {
      userSetPincode();
      await setPincode(this.state.code);
      haptic.notification(Haptic.NotificationFeedbackType.Success);
      this.props.navigation.navigate(MAIN_SCREEN);

      // After they set a pincode, mayyyybe they like the app enough to give it a review?
      if (Platform.OS === "ios" && StoreReview.isAvailable) {
        userPromptedForReviewWhenSettingCode();
        StoreReview.requestReview();
      }
    }

    const isGood = await isCorrectPincode(this.state.code);
    if (isGood) {
      haptic.notification(Haptic.NotificationFeedbackType.Success);
      this.props.navigation.navigate(MAIN_SCREEN);
      this.setState({
        code: "",
      });
    } else {
      this.setState({
        code: "",
      });
      haptic.notification(Haptic.NotificationFeedbackType.Error);
    }
  };

  onBackspace = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
    this.setState(prevState => {
      if (prevState.code.length === 0) {
        return prevState;
      }
      return {
        ...prevState,
        code: prevState.code.substring(0, prevState.code.length - 1),
      };
    });
  };

  render() {
    const { code, isSettingCode } = this.state;
    return (
      <FadesIn
        style={{
          backgroundColor: theme.pink,
          height: "100%",
        }}
        pose={this.state.isReady ? "visible" : "hidden"}
      >
        <StatusBar barStyle="dark-content" hidden={false} />
        <Container
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 24,
            marginTop: Constants.statusBarHeight,
            backgroundColor: theme.pink,
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
                color: "white",
                marginHorizontal: 24,
                textAlign: "center",
              }}
            >
              {isSettingCode
                ? "Please set a passcode"
                : "Please enter your passcode."}
            </Header>
          </Row>
        </Container>

        <Container
          style={{
            flex: 2,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 24,
            backgroundColor: "white",
            borderTopWidth: 2,
            borderColor: theme.darkPink,
          }}
        >
          <Row
            style={{
              marginTop: 32,
              marginLeft: 48,
              marginRight: 48,
              marginBottom: 32,
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
            <KeypadButton title="1" onPress={() => this.onEnterCode("1")} />
            <KeypadButton title="2" onPress={() => this.onEnterCode("2")} />
            <KeypadButton title="3" onPress={() => this.onEnterCode("3")} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
              marginBottom: 12,
            }}
          >
            <KeypadButton title="4" onPress={() => this.onEnterCode("4")} />
            <KeypadButton title="5" onPress={() => this.onEnterCode("5")} />
            <KeypadButton title="6" onPress={() => this.onEnterCode("6")} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
              marginBottom: 12,
            }}
          >
            <KeypadButton title="7" onPress={() => this.onEnterCode("7")} />
            <KeypadButton title="8" onPress={() => this.onEnterCode("8")} />
            <KeypadButton title="9" onPress={() => this.onEnterCode("9")} />
          </Row>

          <Row
            style={{
              justifyContent: "space-evenly",
            }}
          >
            {/* this is a secret button, for use in resetting in the future */}
            <KeypadSideButton
              icon="help"
              accessibilityLabel="help"
              onPress={async () => {
                userRequestedPincodeReset(await getPincode());
              }}
              style={{
                opacity: 0,
              }}
            />
            <KeypadButton title="0" onPress={() => this.onEnterCode("0")} />
            <KeypadSideButton
              icon="delete"
              accessibilityLabel="back"
              onPress={this.onBackspace}
            />
          </Row>
        </Container>
      </FadesIn>
    );
  }
}
