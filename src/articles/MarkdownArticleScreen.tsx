import React from "react";
import ScreenProps from "../ScreenProps";
import { THOUGHT_SCREEN } from "../main/screens";
import MarkdownArticle from "./MarkdownArticle";
import { NavigationEventCallback } from "react-navigation";
import { get } from "lodash";
import { FadesIn } from "../animations";
import { INDEX_LEARN_SCREEN } from "../learn/screens";
import { StatusBar } from "react-native";

export default class MarkdownArticleScreen extends React.Component<
  ScreenProps,
  {
    isReady: boolean;
    shouldFadeIn: boolean;
    pages: string[];
    title: string;
    description: string;
    nextScreen: string;
    shouldHideExitButton: boolean;
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isReady: false,
    shouldFadeIn: false,
    pages: [],
    title: "",
    description: "",
    nextScreen: INDEX_LEARN_SCREEN,
    shouldHideExitButton: false,
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.refresh);
    this.props.navigation.addListener("didFocus", this.refresh);

    setTimeout(() => this.setState({ shouldFadeIn: true }), 100);
  }

  refresh: NavigationEventCallback = async payload => {
    this.setState({
      isReady: false,
    });

    const pages = get(payload, "action.params.pages", []);
    const title = get(payload, "action.params.title", "");
    const description = get(payload, "action.params.description", "");
    const nextScreen = get(
      payload,
      "action.params.nextScreen",
      INDEX_LEARN_SCREEN
    );
    const shouldHideExitButton = get(
      payload,
      "action.params.shouldHideExitButton",
      false
    );

    this.setState({
      isReady: true,
      pages,
      title,
      description,
      nextScreen,
      shouldHideExitButton,
    });
  };

  onFinish = () => {
    this.setState({
      isReady: false,
    });
    this.props.navigation.navigate(this.state.nextScreen);
  };

  render() {
    if (!this.state.isReady) {
      return null;
    }

    return (
      <FadesIn pose={this.state.shouldFadeIn ? "visible" : "hidden"}>
        <StatusBar hidden={false} />
        <MarkdownArticle
          pages={this.state.pages}
          title={this.state.title}
          description={this.state.description}
          onFinish={this.onFinish}
          onExit={this.onFinish}
          shouldHideExitButton={this.state.shouldHideExitButton}
        />
      </FadesIn>
    );
  }
}
