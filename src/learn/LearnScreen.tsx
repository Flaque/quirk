import React from "react";
import { ScrollView, View } from "react-native";
import { MediumHeader } from "../ui";
import ScreenProps from "../ScreenProps";
import theme from "../theme";
import Constants from "expo-constants";
import {
  TouchableCardContainer,
  CardCrown,
  CardTitleAndSubtitleContent,
  CardAttentionDot,
} from "../card/TouchableCard";
import Content from "../articles/Content";
import { MARKDOWN_ARTICLE_SCREEN } from "../screens";
import cbt101 from "../articles/content/cbt101";
import howToUseQuirk from "../articles/content/howToUseQuirk";
import { HowToQuirkImage } from "./images";

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
  <>
    <CardAttentionDot />
    <TouchableCardContainer onPress={() => onPress(content)}>
      <CardCrown text="ARTICLE" featherIconName="book" color={theme.blue} />
      <CardTitleAndSubtitleContent
        title={content.title}
        subtitle={content.description}
      />
    </TouchableCardContainer>
  </>
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
        <MediumHeader>To Read</MediumHeader>

        <ArticleWithImageCard content={cbt101} onPress={this._openContent} />
        <ArticleCard content={howToUseQuirk} onPress={this._openContent} />
        <ArticleCard content={cbt101} onPress={this._openContent} />
      </ScrollView>
    );
  }
}
