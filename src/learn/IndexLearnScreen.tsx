import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import ScreenProps from "../ScreenProps";
import { Container, MediumHeader, HintHeader } from "../ui";
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
      alignSelf: "center",
      marginTop: 24,
    }}
  >
    <MediumHeader>{title}</MediumHeader>
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
          <Article
            title="All or Nothing Thinking"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={AllOrNothingThinkingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/all-or-nothing"}
          />
          <Article
            title="Catastrophizing"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={CatastrophizingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/catastrophizing"}
          />
          <Article
            title="Emotional Reasoning"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={EmotionalReasoningImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/emotional-reasoning"}
          />
          <Article
            title="Fortune Telling"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={FortuneTellingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/fortune-telling"}
          />
          <Article
            title="Labeling"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={LabelingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/labeling"}
          />
          <Article
            title="Magnification of the Negative"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MaxNegativeImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/magnification-of-the-negative"}
          />
          <Article
            title="Mind Reading"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MindReadingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/mind-reading"}
          />
          <Article
            title="Minimization of the Positive"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MinPositiveImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/minimization-of-the-positive"}
          />
          <Article
            title="Other Blaming"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={OtherBlamingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/other-blaming"}
          />
          <Article
            title="Overgeneralization"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={OverGeneralizationImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/overgeneralization"}
          />
          <Article
            title="Self Blaming"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={SelfBlamingImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/self-blaming"}
          />
          <Article
            title="Should Statements"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={ShouldStatementsImage}
            navigation={this.props.navigation}
            url={"https://embedded.quirk.fyi/should-statements"}
          />
        </Container>
      </ScrollView>
    );
  }
}
