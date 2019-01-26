import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { SubHeader, Paragraph, ThoughtDook } from "./ui";
import { ScrollView, View } from "react-native";
import { Constants } from "expo";
import distortions from "./distortions";
import theme from "./theme";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const ThoughtView = ({ children }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 12,
    }}
  >
    <ThoughtDook
      style={{ marginRight: 8, marginLeft: 4, width: 24, height: 24 }}
      source={require("../assets/yellow/Dook.png")}
    />
    <View
      style={{
        backgroundColor: theme.offwhite,
        borderRadius: 8,
        padding: 8,
        marginRight: 25,
      }}
    >
      <Paragraph>{children}</Paragraph>
    </View>
  </View>
);

class ExplanationScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 25,
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: Constants.statusBarHeight + 25,
          backgroundColor: "white",
        }}
      >
        {distortions.map(dist => (
          <View
            style={{
              marginBottom: 48,
            }}
            key={dist.slug}
          >
            <SubHeader>
              {dist.label} {dist.emoji}
            </SubHeader>

            <Paragraph>
              This distortion happens when we have no room for a middle ground.
              If we think that a small fault in ourselves means we’re
              fundamentally rotten or otherwise terrible, we’re likely engaging
              in all or nothing thinking.
            </Paragraph>

            <ThoughtView>
              This chicken is a little burnt, there must be something wrong with
              it.
            </ThoughtView>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default ExplanationScreen;
