import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { getExercise } from "./store";
import { Header, Row, Container } from "./ui";
import { Feather } from "@expo/vector-icons";
import theme from "./theme";
import { CBT_FORM_SCREEN } from "./screens";

const ThoughtItem = ({ thought, onPress }) => (
  <TouchableOpacity
    style={{
      padding: 18,
      backgroundColor: theme.offwhite,
      borderRadius: 13,
      marginBottom: 18,
      borderLeftWidth: 18,
      borderLeftColor: theme.pink
    }}
    onPress={() => onPress(thought)}
  >
    <Text>{thought.automaticThought}</Text>
  </TouchableOpacity>
);

class CBTListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = () => {
    getExercise()
      .then(data => {
        const thoughts = data.map(([key, value]) => JSON.parse(value));
        this.setState({ thoughts });
      })
      .catch(console.error);
  };

  onItemPress = thought => {
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought
    });
  };

  render() {
    const { thoughts } = this.state;
    const items = thoughts.map(thought => (
      <ThoughtItem
        key={thought.uuid}
        thought={thought}
        onPress={this.onItemPress}
      />
    ));
    return (
      <Container>
        <Row>
          <TouchableOpacity
            style={{
              backgroundColor: theme.offwhite,
              height: 48,
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12",
              alignSelf: "center"
            }}
            onPress={() => this.props.navigation.navigate(CBT_FORM_SCREEN)}
          >
            <Feather name="edit" size={24} color={theme.veryLightText} />
          </TouchableOpacity>
          <Header>.quirk</Header>
        </Row>

        {items}
      </Container>
    );
  }
}

export default CBTListScreen;
