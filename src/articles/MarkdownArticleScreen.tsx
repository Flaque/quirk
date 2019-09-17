import React from "react";
import ScreenProps from "../ScreenProps";
import { THOUGHT_SCREEN } from "../main/screens";
import MarkdownArticle from "./MarkdownArticle";
import { NavigationEventCallback } from "react-navigation";
import { get } from "lodash";

export default class MarkdownArticleScreen extends React.Component<
  ScreenProps,
  {
    isReady: boolean;
    pages: string[];
    title: string;
    description: string;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    pages: [],
    title: "",
    description: "",
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.refresh);
    this.props.navigation.addListener("didFocus", this.refresh);
  }

  refresh: NavigationEventCallback = async payload => {
    const pages = get(payload, "action.params.pages", []);
    const title = get(payload, "action.params.title", "");
    const description = get(payload, "action.params.description", "");

    this.setState({
      isReady: true,
      pages,
      title,
      description,
    });
  };

  render() {
    if (!this.state.isReady) {
      return null;
    }

    return (
      <MarkdownArticle
        pages={this.state.pages}
        title={this.state.title}
        description={this.state.description}
        onFinish={() => {
          this.props.navigation.navigate(THOUGHT_SCREEN);
        }}
        onExit={() => {
          this.props.navigation.navigate(THOUGHT_SCREEN);
        }}
      />
    );
  }
}
