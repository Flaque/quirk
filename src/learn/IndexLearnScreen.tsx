import React from "react";
import { Text, Image, View, ScrollView, TouchableOpacity } from "react-native";
import ScreenProps from "../ScreenProps";
import { Container, Row, SubHeader, MediumHeader, HintHeader } from "../ui";
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

const Article = ({ title, subheader, HeroImage }) => (
  <View
    style={{
      alignSelf: "center",
      marginTop: 24,
    }}
  >
    <MediumHeader>{title}</MediumHeader>
    <HintHeader>{subheader}</HintHeader>
    <TouchableOpacity>
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
          />
          <Article
            title="Catastrophizing"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={CatastrophizingImage}
          />
          <Article
            title="Emotional Reasoning"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={EmotionalReasoningImage}
          />
          <Article
            title="Fortune Telling"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={FortuneTellingImage}
          />
          <Article
            title="Labeling"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={LabelingImage}
          />
          <Article
            title="Magnification of the Negative"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MaxNegativeImage}
          />
          <Article
            title="Mind Reading"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MindReadingImage}
          />
          <Article
            title="Minimization of the Positive"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={MinPositiveImage}
          />
          <Article
            title="Other Blaming"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={OtherBlamingImage}
          />
          <Article
            title="Overgeneralization"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={OverGeneralizationImage}
          />
          <Article
            title="Self Blaming"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={SelfBlamingImage}
          />
          <Article
            title="Should Statements"
            subheader={"1 min read - Cognitive Distortion"}
            HeroImage={ShouldStatementsImage}
          />
        </Container>
      </ScrollView>
    );
  }
}
