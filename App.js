import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getExercise } from "./store";
import CBTForm from "./CBTForm";
import { Header } from "./ui";

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
        <Header>quirk.</Header>
        <CBTForm />
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
