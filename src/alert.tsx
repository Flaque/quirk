import React from "react";
import theme from "./theme";
import { SubHeader, Paragraph, RoundedButton } from "./ui";
import posed from "react-native-pose";
import { TouchableWithoutFeedback, View } from "react-native";
import universalHaptic from "./haptic";
import { Haptic } from "expo";

const PopsUp = posed.View({
  full: { height: 412, paddingTop: 18, paddingBottom: 18 },
  peak: {
    height: 156,
    paddingTop: 18,
    paddingBottom: 18,
    transition: { type: "spring", stiffness: 150 },
  },
  hidden: { height: 0, paddingTop: 0, paddingBottom: 0 },
});

interface AlertProps {
  title: string;
  body: string;
}

class Alert extends React.Component<AlertProps> {
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
            padding: 18,
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
          </View>
          <Paragraph>{body}</Paragraph>

          <View
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <RoundedButton
              title={"Got it."}
              onPress={() => {
                this.setState({
                  view: "hidden",
                });
              }}
            />
          </View>
        </PopsUp>
      </TouchableWithoutFeedback>
    );
  }
}

export default Alert;
