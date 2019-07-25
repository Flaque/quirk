import React from "react";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { WebView, View } from "react-native";
import { GhostButton } from "../ui";
import { INDEX_LEARN_SCREEN } from "./screens";
import theme from "../theme";
import { get } from "lodash";
export default class ArticleScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    url: "",
  };

  constructor(props) {
    super(props);
    this.props.navigation.addListener("willFocus", args => {
      const url = get(args, "state.params.url");
      this.setState({
        url,
      });
    });

    this.props.navigation.addListener("didFocus", args => {
      const url = get(args, "state.params.url");
      this.setState({
        url,
      });
    });
  }

  render() {
    console.log("URL:", this.state.url);
    return (
      <View
        style={{
          marginTop: Constants.statusBarHeight + 24,
          flex: 1,
        }}
      >
        <View
          style={{
            paddingBottom: 12,
            paddingHorizontal: 24,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <GhostButton
            title="Back to list"
            borderColor={theme.lightGray}
            textColor={theme.lightText}
            onPress={() => {
              this.props.navigation.navigate(INDEX_LEARN_SCREEN);
            }}
          />
        </View>

        <WebView
          style={{
            flex: 1,
            marginHorizontal: 24,
          }}
          source={{ uri: this.state.url }}
        />
      </View>
    );
  }
}
