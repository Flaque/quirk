import {
  Container,
  Row,
  Header,
  IconButton,
  SubHeader,
  Paragraph,
  RoundedSelector,
} from "../ui";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { View, TextInput } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  ScrollView,
} from "react-navigation";
import theme from "../theme";
import { Constants } from "expo";
import { sliderWidth, itemWidth } from "./sizes";
import i18n from "../i18n";
import { CBT_LIST_SCREEN, EXPLANATION_SCREEN } from "../screens";
import * as flagstore from "../flagstore";
import { newThought } from "../thoughts";

const textInputStyle = {
  height: 156,
  backgroundColor: "white",
  padding: 12,
  paddingTop: 14,
  borderRadius: 8,
  fontSize: 16,
  borderColor: theme.lightGray,
  borderWidth: 1,
  color: theme.darkText,
};
const textInputPlaceholderColor = theme.veryLightText;

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const AutomaticThought = () => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("auto_thought")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Include the situation and the thoughts.
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
      value={""}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={text => console.log("automaticThought", text)}
    />
  </View>
);

const Challenge = () => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("challenge")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Be truthful, honest, and open.
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
      value={""}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={text => console.log("automaticThought", text)}
    />
  </View>
);

const AlternativeThought = () => (
  <View
    style={{
      display: "flex",
    }}
  >
    <SubHeader
      style={{
        marginBottom: 6,
      }}
    >
      {i18n.t("alt_thought")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      What could we think instead?
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
      value={""}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={text => console.log("automaticThought", text)}
    />
  </View>
);

const Distortions = () => (
  <ScrollView>
    <View>
      <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
      <RoundedSelector
        items={newThought().cognitiveDistortions}
        onPress={() => {}}
      />
    </View>
  </ScrollView>
);

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  _carousel = null;

  _renderItem({ item, index }) {
    if (item.slug === "automatic-thought") {
      return <AutomaticThought />;
    }

    if (item.slug === "distortions") {
      return <Distortions />;
    }

    if (item.slug === "challenge") {
      return <Challenge />;
    }

    if (item.slug === "alternative-thought") {
      return <AlternativeThought />;
    }

    return null;
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          height: "100%",
        }}
      >
        <Container
          style={{
            justifyContent: "initial",
            height: "100%",
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: Constants.statusBarHeight,
            paddingTop: 12,
          }}
        >
          <Row
            style={{
              marginBottom: 24,
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <IconButton
              featherIconName={"help-circle"}
              accessibilityLabel={i18n.t("accessibility.help_button")}
              onPress={() => {
                flagstore.setFalse("start-help-badge").then(() => {
                  this.setState({ shouldShowHelpBadge: false });
                  this.props.navigation.push(EXPLANATION_SCREEN);
                });
              }}
              hasBadge={false}
            />
            <Header allowFontScaling={false}>quirk</Header>
            <IconButton
              accessibilityLabel={i18n.t("accessibility.list_button")}
              featherIconName={"list"}
              onPress={() => this.props.navigation.push(CBT_LIST_SCREEN)}
            />
          </Row>

          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={[
              { slug: "automatic-thought" },
              { slug: "distortions" },
              { slug: "challenge" },
              { slug: "alternative-thought" },
            ]}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </Container>
      </View>
    );
  }
}
