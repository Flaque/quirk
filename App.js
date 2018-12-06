import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

const KEY = "@Quirk:items";

const Row = ({ children, ...rest }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      ...rest
    }}
  >
    {children}
  </View>
);

const GrayContainer = ({ children, ...rest }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#F9F9F9",
      padding: 25,
      borderRadius: 18,
      ...rest
    }}
  >
    {children}
  </View>
);

const FormContainer = ({ children }) => (
  <View
    style={{
      marginBottom: 24
    }}
  >
    {children}
  </View>
);

const Header = ({ children }) => (
  <Text
    style={{
      fontWeight: "900",
      fontSize: 48,
      color: "#353B48",
      marginBottom: 12
    }}
  >
    {children}
  </Text>
);

const SubHeader = ({ children }) => (
  <Text
    style={{
      fontWeight: "700",
      fontSize: 24,
      color: "#353B48",
      marginBottom: 12
    }}
  >
    {children}
  </Text>
);

const RoundedInput = ({ value, onChangeText, placeholder, style, ...rest }) => (
  <TextInput
    value={value}
    placeholder={placeholder}
    placeholderTextColor={"#D8D8D8"}
    onChangeText={onChangeText}
    style={{
      height: 48,
      backgroundColor: "white",
      paddingLeft: 12,
      borderRadius: 12,
      ...style
    }}
    {...rest}
  />
);

const SelectorTextItem = ({ text, selected = false }) => (
  <TouchableOpacity>
    <Text
      style={{
        fontWeight: "400",
        fontSize: 14,
        color: selected ? "#353B48" : "#D8D8D8",
        paddingBottom: 12
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const RoundedSelector = ({ value, options, onChange, style }) => (
  <ScrollView
    style={{
      backgroundColor: "white",
      padding: 12,
      borderRadius: 12,
      ...style
    }}
  >
    {options.map(({ label, selected }) => (
      <SelectorTextItem key={label} text={label} selected={selected} />
    ))}
  </ScrollView>
);

const distortions = [
  "All or Nothing Thinking",
  "Overgeneralization",
  "Filtering out the Positive",
  "Jumping to Conclusions",
  "Mind Reading",
  "Fortune Telling",
  "Magnification of the Negative",
  "Minimization of the Positive",
  "Catastrophizing",
  "Emotional Reasoning",
  "Should Statements",
  "Labeling",
  "Self-Blaming",
  "Other-Blaming"
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      automaticThought: "",
      cognitiveDistortions: distortions.map(label => {
        return { label, selected: false };
      }),
      challenge: "",
      alternativeThought: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Row flexGrow={1}>
          <Header>quirk.</Header>
        </Row>

        <GrayContainer flexGrow={6}>
          <FormContainer>
            <SubHeader>Automatic Thought</SubHeader>
            <RoundedInput
              placeholder={"What's going on?"}
              value={this.state.automaticThought}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Cognitive Distortion</SubHeader>
            <RoundedSelector
              style={{
                height: 200
              }}
              options={this.state.cognitiveDistortions}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Challenge</SubHeader>
            <RoundedInput
              placeholder={"Debate that thought!"}
              value={this.state.automaticThought}
            />
          </FormContainer>

          <FormContainer>
            <SubHeader>Alternative Thought</SubHeader>
            <RoundedInput
              placeholder={"What should we think instead?"}
              value={this.state.automaticThought}
            />
          </FormContainer>
        </GrayContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 50
  }
});
