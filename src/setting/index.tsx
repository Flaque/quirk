import React from "react";
import { ScrollView, View, StatusBar } from "react-native";
import theme from "../theme";
import { Constants } from "expo";
import {
  Header,
  Row,
  Container,
  IconButton,
  SubHeader,
  Paragraph,
  RoundedSelectorButton,
} from "../ui";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { CBT_FORM_SCREEN } from "../screens";
import * as store from "./settingstore";
import {
  HISTORY_BUTTON_LABEL_KEY,
  HISTORY_BUTTON_LABEL_DEFAULT,
  HistoryButtonLabelSetting,
  isHistoryButtonLabelSetting,
} from "./settings";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface State {
  ready: boolean;
  historyButtonLabel?: HistoryButtonLabelSetting;
}

class SettingScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  async componentDidMount() {
    await this.refresh();
  }

  refresh = async () => {
    const historyButtonLabel = await store.getSettingOrSetDefault(
      HISTORY_BUTTON_LABEL_KEY,
      HISTORY_BUTTON_LABEL_DEFAULT
    );
    if (!isHistoryButtonLabelSetting(historyButtonLabel)) {
      console.error(
        `Something went wrong getting ${HISTORY_BUTTON_LABEL_KEY}. Got: "${historyButtonLabel}"`
      );
      return;
    }

    this.setState({
      historyButtonLabel,
      ready: true,
    });
  };

  navigateToForm = () => {
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought: false,
    });
  };

  toggleHistoryButtonLabels = () => {
    if (!this.state.ready) {
      this.refresh();
      return;
    }

    if (this.state.historyButtonLabel === "alternative-thought") {
      store.setSetting<HistoryButtonLabelSetting>(
        HISTORY_BUTTON_LABEL_KEY,
        "automatic-thought"
      );
      this.refresh();
    } else {
      store.setSetting<HistoryButtonLabelSetting>(
        HISTORY_BUTTON_LABEL_KEY,
        "alternative-thought"
      );
      this.refresh();
    }
  };

  render() {
    const { historyButtonLabel, ready } = this.state;

    if (!ready) {
      return <View style={{ backgroundColor: theme.lightOffwhite }} />;
    }

    return (
      <View style={{ backgroundColor: theme.lightOffwhite }}>
        <ScrollView
          style={{
            backgroundColor: theme.lightOffwhite,
            marginTop: Constants.statusBarHeight,
            paddingTop: 24,
            height: "100%",
          }}
        >
          <Container>
            <StatusBar barStyle="dark-content" />
            <Row style={{ marginBottom: 18 }}>
              <Header>quirk*</Header>
              <IconButton
                featherIconName={"edit"}
                onPress={() => this.navigateToForm()}
              />
            </Row>

            <Row
              style={{
                marginBottom: 18,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SubHeader>*history button labels</SubHeader>
              <Paragraph
                style={{
                  marginBottom: 9,
                }}
              >
                By default, we set the buttons in the history screen to use the
                Alternative Thought. This helps cement the thought as "changed."
              </Paragraph>
              <RoundedSelectorButton
                title={"Alternative Thought"}
                selected={historyButtonLabel === "alternative-thought"}
                onPress={() => this.toggleHistoryButtonLabels()}
              />
              <RoundedSelectorButton
                title={"Automatic Thought"}
                selected={historyButtonLabel === "automatic-thought"}
                onPress={() => this.toggleHistoryButtonLabels()}
              />
            </Row>
          </Container>
        </ScrollView>
      </View>
    );
  }
}

export default SettingScreen;
