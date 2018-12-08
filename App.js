import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getExercise } from "./store";
import Swiper from "react-native-swiper";
import CBTForm from "./CBTForm";
import { GrayContainer, SubHeader, FormContainer } from "./ui";

const CBTList = ({ thought }) => (
  <View style={styles.container}>
    <GrayContainer>
      <FormContainer>
        <SubHeader> Automatic Thought</SubHeader>
        <Text>{thought.automaticThought}</Text>
      </FormContainer>

      <FormContainer>
        <SubHeader> Challenge </SubHeader>
        <Text>{thought.challenge}</Text>
      </FormContainer>

      <FormContainer>
        <SubHeader> Alternative Thought</SubHeader>
        <Text>{thought.alternativeThought}</Text>
      </FormContainer>
    </GrayContainer>
  </View>
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
    return (
      <Swiper>
        <View style={styles.container}>
          <CBTForm />
        </View>
        {this.state.thoughts.length > 0 && (
          <View style={styles.container}>
            <CBTList thought={this.state.thoughts[0]} />
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
