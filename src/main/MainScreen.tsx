import React from "react";
import ScreenProps from "../ScreenProps";
import { ScrollView, View, Button } from "react-native";
import theme from "../theme";
import { ActionButton } from "../ui";

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          flex: 1,
          padding: 0,
          margin: 0,
        }}
      >
        <ScrollView>{/* Main Page Here */}</ScrollView>

        <View
          style={{
            backgroundColor: "white",
            height: 76,
            borderTopColor: theme.lightGray,
            borderTopWidth: 1,
            paddingBottom: 24,
            paddingHorizontal: 12,
            paddingTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* New navigation here */}
          <ActionButton title="Settings" style={{ marginHorizontal: 4 }} />
          <ActionButton title="Thoughts" style={{ marginHorizontal: 4 }} />
          <ActionButton title="Help" style={{ marginHorizontal: 4 }} />
        </View>
      </View>
    );
  }
}
