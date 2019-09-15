import React from "react";
import ScreenProps from "../ScreenProps";
import theme from "../theme";
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
import clamp from "./clamp";
import shadowStyle from "../shadowStyle";
import { Feather } from "@expo/vector-icons";
import { Header, HintHeader } from "../ui";
import { THOUGHT_SCREEN } from "../main/screens";
import CircleFlasher from "./CircleFlasher";

const pageOne = `
# CBT is well studied

Cognitive Behavioral Therapy is the de-facto standard treatment for mood disorders like anxiety and depression. However, even if you haven't been diagnosed with a severe mental health condition, CBT can still help you feel happier and better manage your life. 

Like physical therapy, CBT is exercise and goal based. It's something you have to practice. CBT isn't something you read about and then all of a sudden feel better; you have to actively do the exercises. 
`;

const pageTwo = `
# Negative thoughts cause your mood

The primary premise of CBT is that your thoughts cause your mood. They're obviously not the *only* cause;  sleep, diet, and exercise can all have quite significant effects. But your thoughts and world view are powerful forces in shaping your day-to-day mood. 

Your brain is *really* good at making you feel exactly what you're thinking.

# Negative thoughts can compound on each other

To see how this happens, let's imagine you're job-hunting. You just finished an interview and they gave you a tough final question that you weren't sure how to answer. 

After the interview, you keep repeating that experience in your head. You start by thinking "I *know* I failed that interview, I must have screwed up on that question." Before you realize it, you're thinking "What if this happens in the next interview, I'll probably fail that one too. I'm gonna fail all my interviews!" Which then leads you to think "Oh god, if I fail all these interviews, I must just be stupid. I'm probably not even right for this career path, I should just give up." 

It's not uncommon for this type of thought pattern to happen quickly, each thought happening only minutes or even seconds after the previous. At the end, you're likely feeling terrible. 

This process is called "Catastrophizing" and it's quite common, even for folks who aren't diagnosed with any particular mental illness. But that doesn't mean it has to keep happening to you. 
`;

const pageThree = `
# These thoughts are automatic

In some cases, you can cause a thought to happen. For example, if you say the words "I'm a purple elephant bear" in your head, you're causing that thought to happen. When you do that, you can pretty clearly tell that you're *not* a purple elephant bear, not only because it's absurd, but because you *chose* to think it. 

In our interview example, it's likely that you didn't set out to think each of these thoughts. Instead, they just "happened." Mental health professionals call these "automatic thoughts."
`;

class MarkdownArticle extends React.Component<
  {
    pages: string[];
    title: string;
    description: string;
    onFinish: () => any;
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
          {this.state.index === -1 && <TitleTopBar onExit={this.onBack} />}
          {this.state.index !== -1 && (
            <ArticleTopBar
              onExit={this.onBack}
              progress={progress}
              pose={this.state.articleTopBarPose as "hidden" | "visible"}
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

export default class MarkdownArticleScreen extends React.Component<
  ScreenProps
> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <MarkdownArticle
        pages={[pageOne, pageTwo, pageThree]}
        title="Cognitive Behavioral Therapy 101"
        description="An introduction to Cognitive Behavioral Therapy."
        onFinish={() => {
          this.props.navigation.navigate(THOUGHT_SCREEN);
        }}
      />
    );
  }
}
