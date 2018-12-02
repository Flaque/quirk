import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const IntensityButton = ({ intensity }) => (
  <TouchableOpacity style={styles.circleButton}>
    <Text style={styles.label}>{intensity}</Text>
  </TouchableOpacity>
);

const Row = ({ children }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {children}
  </View>
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>quirk.</Text>

        <View style={styles.buttonContainer}>
          <Row>
            <IntensityButton intensity={1} />
            <IntensityButton intensity={2} />
            <IntensityButton intensity={3} />
          </Row>

          <Row>
            <IntensityButton intensity={4} />
            <IntensityButton intensity={5} />
            <IntensityButton intensity={6} />
          </Row>

          <Row>
            <IntensityButton intensity={7} />
            <IntensityButton intensity={8} />
            <IntensityButton intensity={9} />
          </Row>

          <Row>
            <IntensityButton intensity={0} />
            <IntensityButton intensity={10} />
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 25
  },
  header: {
    fontWeight: "900",
    fontSize: 48,
    color: "#353B48",
    marginBottom: 12
  },
  label: {
    fontWeight: "700",
    fontSize: 32,
    color: "white"
  },
  circleButton: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: "#00A8FF",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    height: 400
  }
});
