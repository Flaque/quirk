import React from "react";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { WebView, View, ActivityIndicator, Dimensions } from "react-native";
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
    isLoading: true,
  };

  constructor(props) {
    super(props);

    // Having both of these hack-fixes a bug where the state gets mixed up
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
            title="Back"
            borderColor={theme.lightGray}
            textColor={theme.lightText}
            onPress={() => {
              this.props.navigation.navigate(INDEX_LEARN_SCREEN);
            }}
          />
        </View>

        <WebView
          onLoad={() => {
            this.setState({
              isLoading: false,
            });
          }}
          style={{
            flex: 1,
            marginHorizontal: 24,
          }}
          javaScriptEnabled={false}
          source={{ uri: this.state.url }}
        />

        {this.state.isLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: Dimensions.get("screen").height / 2,
              left: Dimensions.get("screen").width / 2,
            }}
            size="large"
          />
        )}
      </View>
    );
  }
}
