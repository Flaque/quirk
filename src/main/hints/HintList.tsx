import React from "react";
import { FloatingCard, SubHeader, Paragraph, IconButton, Row } from "../../ui";
import { FadesInAndShrinks } from "../../animations";
import { Hints } from "./Hints";
import { getCurrentHintIndex, incrementIndex } from "./hintstore";

const HintCard = ({ title, message, onDismiss, visible }) => (
  <FadesInAndShrinks pose={visible ? "visible" : "hidden"}>
    <FloatingCard
      style={{
        marginHorizontal: 24,
        marginTop: 12,
        marginBottom: 24,
        flex: 1,
      }}
    >
      <Row
        style={{
          marginBottom: 12,
          alignItems: "flex-start",
        }}
      >
        <SubHeader
          style={{
            alignSelf: "center",
            marginBottom: 0,
            width: "85%",
          }}
        >
          {title}
        </SubHeader>
        <IconButton
          featherIconName="x"
          accessibilityLabel="close"
          onPress={onDismiss}
          style={{
            width: 32,
            height: 32,
            alignSelf: "flex-start",
          }}
          iconSize={20}
        />
      </Row>
      <Paragraph>{message}</Paragraph>
    </FloatingCard>
  </FadesInAndShrinks>
);

class HintList extends React.Component {
  state = {
    showCard: true,
    hintToShow: 99999,
    noHintsLeft: false,
    isReady: false,
  };

  async componentDidMount() {
    const currentHintIndex = await getCurrentHintIndex();
    this.setState({
      hintToShow: currentHintIndex,
      showCard: true,
      isReady: true,
    });
  }

  onDismiss = async () => {
    this.setState({
      showCard: false,
    });
    await incrementIndex();

    setTimeout(() => {
      this.setState({
        isReady: false,
      });
    }, 500);
  };

  render() {
    if (!this.state.isReady) {
      return null;
    }

    const hint = Hints.find(({ order }) => order === this.state.hintToShow);

    // No more hints
    if (!hint) {
      return null;
    }

    return (
      <HintCard
        title={hint.title}
        message={hint.message}
        onDismiss={this.onDismiss}
        visible={this.state.showCard}
      />
    );
  }
}

export default HintList;
