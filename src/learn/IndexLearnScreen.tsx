import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ScreenProps from "../ScreenProps";
import { Container, MediumHeader, HintHeader, SubHeader } from "../ui";
import Constants from "expo-constants";
import theme from "../theme";
import {
  AllOrNothingThinkingImage,
  CatastrophizingImage,
  EmotionalReasoningImage,
  FortuneTellingImage,
  LabelingImage,
  MaxNegativeImage,
  MinPositiveImage,
  MindReadingImage,
  OtherBlamingImage,
  OverGeneralizationImage,
  SelfBlamingImage,
  ShouldStatementsImage,
  HowToQuirkImage,
} from "./images";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import { ARTICLE_SCREEN } from "./screens";
import * as stats from "../stats";

const Article = ({
  title,
  subheader,
  HeroImage,
  url,
  navigation,
}: ScreenProps & {
  title: string;
  subheader: string;
  HeroImage: any;
  url: string;
}) => (
  <View
    style={{
      marginTop: 24,
      padding: 0,
    }}
  >
    <SubHeader>{title}</SubHeader>
    <HintHeader>{subheader}</HintHeader>
    <TouchableOpacity
      onPress={() => {
        stats.userReadArticle(title);
        navigation.navigate(ARTICLE_SCREEN, {
          url,
        });
      }}
    >
      <HeroImage />
    </TouchableOpacity>
  </View>
);

export default class IndexLearnScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          backgroundColor: theme.lightOffwhite,
        }}
      >
        <Container
          style={{
            paddingBottom: TAB_BAR_HEIGHT * 2 + 24,
          }}
        >
          <MediumHeader>Read This First</MediumHeader>
          <HintHeader
            style={{
              marginBottom: 0,
            }}
          >
            Learn the basics of CBT and how to use Quirk.
          </HintHeader>
          <Article
            title="How to use Quirk"
            subheader={"8 min read"}
            HeroImage={HowToQuirkImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/how-to-quirk"}
          />

          <View
            style={{
              marginTop: 48,
            }}
          >
            <MediumHeader>Cognitive Distortions</MediumHeader>
            <HintHeader
              style={{
                marginBottom: 0,
              }}
            >
              Learn the most common ways your thoughts can be distorted.
            </HintHeader>
            <Article
              title="All or Nothing Thinking"
              subheader={"1 min read "}
              HeroImage={AllOrNothingThinkingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/all-or-nothing"}
            />
            <Article
              title="Catastrophizing"
              subheader={"1 min read "}
              HeroImage={CatastrophizingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/catastrophizing"}
            />
            <Article
              title="Emotional Reasoning"
              subheader={"1 min read "}
              HeroImage={EmotionalReasoningImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/emotional-reasoning"}
            />
            <Article
              title="Fortune Telling"
              subheader={"1 min read "}
              HeroImage={FortuneTellingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/fortune-telling"}
            />
            <Article
              title="Labeling"
              subheader={"1 min read "}
              HeroImage={LabelingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/labeling"}
            />
            <Article
              title="Magnification of the Negative"
              subheader={"1 min read "}
              HeroImage={MaxNegativeImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/magnification-of-the-negative"}
            />
            <Article
              title="Mind Reading"
              subheader={"1 min read "}
              HeroImage={MindReadingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/mind-reading"}
            />
            <Article
              title="Minimization of the Positive"
              subheader={"1 min read "}
              HeroImage={MinPositiveImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/minimization-of-the-positive"}
            />
            <Article
              title="Other Blaming"
              subheader={"1 min read "}
              HeroImage={OtherBlamingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/other-blaming"}
            />
            <Article
              title="Overgeneralization"
              subheader={"1 min read "}
              HeroImage={OverGeneralizationImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/overgeneralization"}
            />
            <Article
              title="Self Blaming"
              subheader={"1 min read "}
              HeroImage={SelfBlamingImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/self-blaming"}
            />
            <Article
              title="Should Statements"
              subheader={"1 min read "}
              HeroImage={ShouldStatementsImage}
              navigation={this.props.navigation}
              url={"https://embedded.quirk.fyi/should-statements"}
            />
          </View>
        </Container>
      </ScrollView>
    );
  }
}
