import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { getExercise } from "./store";
import CBTForm from "./CBTForm";
import { Header, Row } from "./ui";
import { Feather } from "@expo/vector-icons";
import theme from "./theme";

const CognitiveDistortionItem = ({ label }) => (
  <Text>
    {"• "}
    {label}
    {"\n"}
  </Text>
);

const cognitiveDistortionsToString = cognitiveDistortions => {
  return cognitiveDistortions
    .filter(({ selected }) => selected) // Only the selected ones
    .map(({ label }) => `• ${label}\n`) // `• some_distortion`
    .join("") // Combine the strings
    .trim(); // Trim any final endlines
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thoughts: []
    };
  }

  componentDidMount = () => {
    getExercise().then(data => {
      const thoughts = data.map(([key, value]) => JSON.parse(value));
      this.setState({ thoughts });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Row>
          <Header>quirk.</Header>
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
          >
            <Feather name="menu" size={24} color={theme.veryLightText} />
          </TouchableOpacity>
        </Row>

        <Row>
          <CBTForm />
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: 75,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 50
  }
});
