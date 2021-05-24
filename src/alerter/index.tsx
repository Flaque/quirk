import React from "react";
import theme from "../theme";
import { SubHeader, Paragraph, IconButton } from "../ui";
import posed from "react-native-pose";
import { TouchableWithoutFeedback, View } from "react-native";
import universalHaptic from "../haptic";
import * as Haptic from "expo-haptics";
import {
  hiddenAlerts,
  hide,
  hideMultipleAlerts,
  isNewUser,
} from "./alertstore";
import { sortBy } from "lodash";

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

interface AlertViewProps {
  title: string;
  body: string;
  onHide: () => void;
}

class AlertView extends React.Component<AlertViewProps> {
  state = {
    view: "hidden",
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ view: "peak" });
      universalHaptic.notification(Haptic.NotificationFeedbackType.Success);
    }, 350);
  }

  render() {
    const { title, body } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ view: "full" });
        }}
      >
        <PopsUp
          pose={this.state.view}
          style={{
            position: "absolute",
            width: "100%",
            height: 256,
            padding: 24,
            bottom: 24,
            borderRadius: 13,
            backgroundColor: "white",
            borderColor: theme.lightGray,
            borderWidth: 2,
            shadowColor: theme.lightGray,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 10,
            shadowOpacity: 0.8,
            opacity: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <SubHeader
              style={{
                height: 48,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                lineHeight: 48,
                marginBottom: 0,
                fontSize: 24,
              }}
            >
              {title}
            </SubHeader>
            <IconButton
              featherIconName="x"
              accessibilityLabel="close"
              onPress={() => {
                this.setState({
                  view: "hidden",
                });
                this.props.onHide();
              }}
            />
          </View>
          <Paragraph>{body}</Paragraph>
        </PopsUp>
      </TouchableWithoutFeedback>
    );
  }
}

export interface Alert {
  title: string;
  body: string;
  slug: string;

  // Increase this number for newer alerts if you'd like
  priority: 0;
}

interface AlerterProps {
  alerts: Alert[];
}

interface AlerterState {
  shown?: Alert;
}

class Alerter extends React.Component<AlerterProps, AlerterState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { alerts } = this.props;

    // If someone is a new user, just go ahead and hide
    // all anouncements. They can just see the app as it is
    if (await isNewUser()) {
      await hideMultipleAlerts(alerts.map(({ slug }) => slug));
      return;
    }

    const hidden = await hiddenAlerts();
    const showableAlerts = sortBy(alerts, ["priority"]).filter(
      ({ slug }) => !hidden.includes(slug)
    );

    this.setState({
      shown: showableAlerts[0],
    });
  }

  onHide = (slug: string) => {
    hide(slug);
  };

  render() {
    if (!this.state.shown) {
      return false;
    }

    const { shown } = this.state;
    return (
      <AlertView
        title={shown.title}
        body={shown.body}
        onHide={() => this.onHide(shown.slug)}
      />
    );
  }
}

export default Alerter;
