import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getExercise } from "./store";
import Swiper from "react-native-swiper";
import CBTForm from "./CBTForm";
import { GrayContainer, SubHeader, FormContainer } from "./ui";

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

const CBTList = ({ thought }) => (
  <GrayContainer>
    <FormContainer>
      <SubHeader>Automatic Thought</SubHeader>
      <Text>{thought.automaticThought}</Text>
    </FormContainer>

    <FormContainer>
      <SubHeader>Challenge</SubHeader>
      <Text>{thought.challenge}</Text>
    </FormContainer>

    <FormContainer>
      <SubHeader>Cognitive Distortion</SubHeader>
      <Text>{cognitiveDistortionsToString(thought.cognitiveDistortions)}</Text>
    </FormContainer>

    <FormContainer>
      <SubHeader>Alternative Thought</SubHeader>
      <Text>{thought.alternativeThought}</Text>
    </FormContainer>
  </GrayContainer>
);

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
    console.log(this.state.thoughts.length);
    return (
      <Swiper>
        <View style={styles.container}>
          <CBTForm />
        </View>

        {this.state.thoughts.length > 0 && (
          <View style={styles.container}>
            {this.state.thoughts.map(thought => (
              <CBTList key={thought.uuid} thought={thought} />
            ))}
          </View>
        )}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 75,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 50
  }
});
