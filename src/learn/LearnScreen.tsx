import React from "react";
import { ScrollView, View } from "react-native";
import { MediumHeader, SubHeader } from "../ui";
import ScreenProps from "../ScreenProps";
import theme from "../theme";
import Constants from "expo-constants";
import {
  TouchableCardContainer,
  CardCrown,
  CardTitleAndSubtitleContent,
} from "../card/TouchableCard";
import Content from "../articles/Content";
import { MARKDOWN_ARTICLE_SCREEN } from "../screens";
import { HowToQuirkImage } from "./images";
import cbt101 from "../articles/content/cbt101";
import howToUseQuirk from "../articles/content/howToUseQuirk";
import allOrNothing from "../articles/content/all-or-nothing";
import catastrophizing from "../articles/content/catastrophizing";
import emotionalReasoning from "../articles/content/emotional-reasoning";
import fortuneTelling from "../articles/content/fortune-telling";
import labeling from "../articles/content/labeling";
import magnification from "../articles/content/magnification-of-the-negative";
import mindReading from "../articles/content/mind-reading";
import minimization from "../articles/content/minimization-of-the-positive";
import otherBlaming from "../articles/content/other-blaming";
import overgeneralization from "../articles/content/overgeneralization";
import predictions from "../articles/content/predictions";
import selfBlaming from "../articles/content/self-blaming";
import shouldStatements from "../articles/content/should-statements";

const ArticleWithImageCard = ({
  content,
  onPress,
}: {
  content: Content;
  onPress: (content: Content) => any;
}) => (
  <TouchableCardContainer onPress={() => onPress(content)}>
    <CardCrown text="ARTICLE" featherIconName="circle" color={theme.blue} />
    <View
      style={{
        borderTopWidth: 1,
        borderColor: theme.lightGray,
      }}
    >
      <HowToQuirkImage />
    </View>
    <CardTitleAndSubtitleContent
      title={content.title}
      subtitle={content.description}
    />
  </TouchableCardContainer>
);

const ArticleCard = ({
  content,
  onPress,
}: {
  content: Content;
  onPress: (content: Content) => any;
}) => (
  <TouchableCardContainer onPress={() => onPress(content)}>
    <CardCrown text="ARTICLE" featherIconName="circle" color={theme.blue} />
    <CardTitleAndSubtitleContent
      title={content.title}
      subtitle={content.description}
    />
  </TouchableCardContainer>
);

export default class LearnScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  _openContent = (content: Content, nextScreen?: string) => {
    this.props.navigation.navigate(MARKDOWN_ARTICLE_SCREEN, {
      pages: content.pages,
      title: content.title,
      description: content.description,
      nextScreen,
    });
  };

  onArticlePress = (content: Content) => this._openContent(content);

  render() {
    return (
      <ScrollView
        style={{
          paddingTop: Constants.statusBarHeight + 24,
          paddingHorizontal: 24,
          backgroundColor: theme.lightOffwhite,
        }}
      >
        <View
          style={{
            marginBottom: 128,
          }}
        >
          <MediumHeader
            style={{
              marginBottom: 24,
            }}
          >
            To Read
          </MediumHeader>

          <SubHeader>Start Here</SubHeader>
          <ArticleWithImageCard content={cbt101} onPress={this._openContent} />
          <ArticleCard content={howToUseQuirk} onPress={this._openContent} />

          <SubHeader>Cognitive Distortions</SubHeader>
          <ArticleCard content={allOrNothing} onPress={this._openContent} />
          <ArticleCard content={catastrophizing} onPress={this._openContent} />
          <ArticleCard
            content={emotionalReasoning}
            onPress={this._openContent}
          />
          <ArticleCard content={fortuneTelling} onPress={this._openContent} />
          <ArticleCard content={labeling} onPress={this._openContent} />
          <ArticleCard content={magnification} onPress={this._openContent} />
          <ArticleCard content={mindReading} onPress={this._openContent} />
          <ArticleCard content={minimization} onPress={this._openContent} />
          <ArticleCard content={otherBlaming} onPress={this._openContent} />
          <ArticleCard
            content={overgeneralization}
            onPress={this._openContent}
          />
          <ArticleCard content={predictions} onPress={this._openContent} />
          <ArticleCard content={selfBlaming} onPress={this._openContent} />
          <ArticleCard content={shouldStatements} onPress={this._openContent} />
        </View>
      </ScrollView>
    );
  }
}
