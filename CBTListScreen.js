import React from "react";
import { Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { getExercise, deleteExercise } from "./store";
import { Header, Row, Container, IconButton } from "./ui";
import theme from "./theme";
import { CBT_FORM_SCREEN } from "./screens";

const ThoughtItem = ({ thought, onPress, onDelete }) => (
  <Row alignItems={"strech"} marginBottom={18}>
    <TouchableOpacity
      style={{
        padding: 18,
        backgroundColor: theme.lightGray,
        borderRadius: 13,
        borderLeftWidth: 18,
        borderLeftColor: theme.blue,
        flex: 1,
        marginRight: 18,
      }}
      onPress={() => onPress(thought)}
    >
      <Text
        style={{
          color: theme.lightText,
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        {thought.automaticThought}
      </Text>
    </TouchableOpacity>

    <IconButton featherIconName={"trash"} onPress={() => onDelete(thought)} />
  </Row>
);

ThoughtItem.propTypes = {
  thought: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

class CBTListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  syncExercises = () => {
    getExercise()
      .then(data => {
        const thoughts = data.map(([_, value]) => JSON.parse(value));
        this.setState({ thoughts });
      })
      .catch(console.error);
  };

  componentDidMount = () => {
    this.syncExercises();
  };

  navigateToForm = () => {
    this.navigateToFormWithThought(false);
  };

  navigateToFormWithThought = thought => {
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought,
    });
  };

  onItemDelete = thought => {
    deleteExercise(thought.uuid).then(() => this.syncExercises());
  };

  render() {
    const { thoughts } = this.state;
    const items = thoughts.map(thought => (
      <ThoughtItem
        key={thought.uuid}
        thought={thought}
        onPress={this.navigateToFormWithThought}
        onDelete={this.onItemDelete}
      />
    ));
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <Row marginBottom={18}>
            <IconButton
              featherIconName={"edit"}
              onPress={() => this.navigateToForm()}
            />
            <Header>.quirk</Header>
          </Row>
          {items}
        </ScrollView>
      </Container>
    );
  }
}

CBTListScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default CBTListScreen;
