import React from "react";
import {
  ScrollView,
  StatusBar,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Markdown from "react-native-markdown-renderer";
import ArticleTopBar, { TAB_BAR_HEIGHT, TitleTopBar } from "./ArticleTopBar";
import styles from "./styles";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import Constants from "expo-constants";
import clamp from "../math/clamp";
import { Header, HintHeader } from "../ui";
import CircleFlasher from "./CircleFlasher";

export default class MarkdownArticle extends React.Component<
  {
    pages: string[];
    title: string;
    description: string;
    onFinish: () => any;
    onExit: () => any;
    shouldHideExitButton: boolean;
  },
  {
    index: number;
    rightFlasherPose: string;
    articleTopBarPose: string;
  }
> {
  state = {
    index: -1,
    rightFlasherPose: "hidden",
    articleTopBarPose: "hidden",
  };

  _renderPage = () => {
    if (this.state.index === -1) {
      return (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-end",
            height:
              Dimensions.get("window").height -
              TAB_BAR_HEIGHT -
              Constants.statusBarHeight -
              48,
            paddingBottom: 24,
          }}
        >
          <Header>{this.props.title}</Header>
          <HintHeader
            style={{
              width: "72%",
            }}
          >
            {this.props.description}
          </HintHeader>
        </View>
      );
    }

    return (
      <Markdown style={styles}>
        {(this.props.pages[this.state.index] || "").trim()}
      </Markdown>
    );
  };

  flickerRightFlasher = () => {
    this.setState(prevState => {
      if (prevState.rightFlasherPose === "hidden") {
        return {
          ...prevState,
          rightFlasherPose: "visible",
        };
      }
      return {
        ...prevState,
        rightFlasherPose: "hidden",
      };
    });
  };

  _rightFlicker: NodeJS.Timeout;

  componentDidMount() {
    this.flickerRightFlasher();
    this._rightFlicker = setInterval(this.flickerRightFlasher, 800);
  }

  onNext = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    // Title screen => Article Screen
    if (this.state.index === -1) {
      setTimeout(() => this.setState({ articleTopBarPose: "visible" }), 100);
    }

    // Article screen => Finish
    if (this.state.index >= this.props.pages.length - 1) {
      haptic.notification(Haptic.NotificationFeedbackType.Success);
      this.props.onFinish();
      return;
    }

    this.setState(prevState => {
      if (prevState.index + 1 >= this.props.pages.length) {
        return prevState;
      }

      return {
        ...prevState,
        rightFlasherPose: "hidden",
        index: prevState.index + 1,
      };
    });
    clearInterval(this._rightFlicker);
  };

  onBack = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    if (this.state.index === 0) {
      this._rightFlicker = setInterval(this.flickerRightFlasher, 800);
    }

    this.setState(prevState => {
      if (prevState.index - 1 < -1) {
        return prevState;
      }

      if (prevState.index - 1 === -1) {
        return {
          ...prevState,
          articleTopBarPose: "hidden",
          index: prevState.index - 1,
        };
      }

      return {
        ...prevState,
        index: prevState.index - 1,
      };
    });
  };

  onExit = () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Medium);
    this.props.onExit();
  };

  render() {
    // Don't start the progress bar at absolute 0 or you'll chop the head
    // off the little Quirk bubble 😱
    const progress = clamp(
      (this.state.index / (this.props.pages.length - 1)) * 100,
      20,
      100
    );

    return (
      <>
        <StatusBar hidden={false} />
        <ScrollView
          style={{
            backgroundColor: "white",
            height: "100%",
            flexGrow: 1,
          }}
        >
          {/* index === -1 is the title page */}
          {this.state.index === -1 && (
            <TitleTopBar
              onExit={this.onExit}
              shouldShowExitButton={!this.props.shouldHideExitButton}
            />
          )}
          {this.state.index !== -1 && (
            <ArticleTopBar
              onExit={this.onExit}
              progress={progress}
              pose={this.state.articleTopBarPose as "hidden" | "visible"}
              shouldShowExitButton={!this.props.shouldHideExitButton}
            />
          )}

          <View
            style={{
              padding: 24,
              height: "100%",
            }}
          >
            {this._renderPage()}
          </View>
        </ScrollView>
        <TouchableWithoutFeedback onPress={this.onNext}>
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "18%",
              right: 0,
              top: TAB_BAR_HEIGHT + Constants.statusBarHeight,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              paddingBottom: TAB_BAR_HEIGHT + Constants.statusBarHeight + 24,
            }}
          >
            <CircleFlasher pose={this.state.rightFlasherPose} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.onBack}>
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "18%",
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              top: TAB_BAR_HEIGHT + Constants.statusBarHeight,
            }}
          />
        </TouchableWithoutFeedback>
      </>
    );
  }
}
