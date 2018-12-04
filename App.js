import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import safeJsonStringify from "safe-json-stringify";

const KEY = "@Quirk:items";

const IntensityButton = ({ intensity, onPress }) => (
  <TouchableOpacity
    style={styles.circleButton}
    onPress={() => onPress(intensity)}
  >
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

const Keypad = ({ onPress, stamps = [] }) => (
  <View style={styles.buttonContainer}>
    <Row>
      <IntensityButton intensity={1} onPress={onPress} />
      <IntensityButton intensity={2} onPress={onPress} />
      <IntensityButton intensity={3} onPress={onPress} />
    </Row>

    <Row>
      <IntensityButton intensity={4} onPress={onPress} />
      <IntensityButton intensity={5} onPress={onPress} />
      <IntensityButton intensity={6} onPress={onPress} />
    </Row>

    <Row>
      <IntensityButton intensity={7} onPress={onPress} />
      <IntensityButton intensity={8} onPress={onPress} />
      <IntensityButton intensity={9} onPress={onPress} />
    </Row>

    <Row>
      <IntensityButton intensity={0} onPress={onPress} />
      <IntensityButton intensity={10} onPress={onPress} />
    </Row>
  </View>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stamps: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>quirk.</Text>

        <Keypad onPress={this.onPress} stamps={this.state.stamps} />
      </View>
    );
  }

  componentDidMount = () => {
    this._syncStampsToState();
  };

  onPress = async intensity => {
    await this._storeStamp(intensity);
    await this._syncStampsToState();
  };

  _syncStampsToState = async () => {
    const { stamps } = await this._retrieveStamps();
    this.setState({ stamps });
  };

  _retrieveStamps = async () => {
    try {
      const json = await AsyncStorage.getItem(KEY);
      return JSON.parse(json);
    } catch (error) {
      Alert.alert(
        "Aw Shucks",
        `Something went wrong getting your info. I'm really sorry about that! Would you mind sending me an email with some info about your device and what you were doing before this? Email: evanjamesconrad@gmail.com`
      );
    }
  };

  _storeStamp = async value => {
    let { stamps } = await this._retrieveStamps();
    stamps = stamps.concat({ value, time: Date.now() });

    try {
      const jsonString = safeJsonStringify({ stamps });
      await AsyncStorage.mergeItem(KEY, jsonString);
    } catch (error) {
      Alert.alert(
        "Aw Shucks",
        `Something went wrong saving your info. I'm really sorry about that! Would you mind sending me an email with some info about your device and what you were doing before this? Email: evanjamesconrad@gmail.com`
      );
      console.error(error);
    }
  };
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
