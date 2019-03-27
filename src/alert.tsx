import React from "react";
import theme from "./theme";
import { SubHeader, Paragraph } from "./ui";
import posed from "react-native-pose";
import { TouchableWithoutFeedback } from "react-native";

const PopsUp = posed.View({
  full: { height: 512 },
  peak: { height: 128 },
  hidden: { height: 0 },
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
    }, 100);
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
          }}
        >
          <SubHeader>{title}</SubHeader>
          <Paragraph>{body}</Paragraph>
        </PopsUp>
      </TouchableWithoutFeedback>
    );
  }
}

export default Alert;
