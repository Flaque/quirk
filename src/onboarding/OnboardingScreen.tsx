import React from "react";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import { recordScreenCallOnFocus } from "../navigation";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../form/sizes";
import { View, Image } from "react-native";
import { Header, Container, Paragraph, ActionButton } from "../ui";
import { Constants, Haptic } from "expo";
import theme from "../theme";
import haptic from "../haptic";
import * as stats from "../stats";
import { CBT_FORM_SCREEN } from "../screens";

interface ScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

const RecordStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/looker/Looker.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Record negative thoughts when they happen.
    </Header>
    <Paragraph
      style={{
        fontSize: 20,
      }}
    >
      If you use it in the moment, Quirk retrains your moods to be less affected
      by your thoughts.
    </Paragraph>
  </View>
);

const ChallengeStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/eater/eater.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Challenge your internal monologue.
    </Header>
    <Paragraph
      style={{
        fontSize: 20,
      }}
    >
      Thoughts that cause emotional stress are nearly always distorted.
    </Paragraph>
  </View>
);

const ChangeStep = () => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/logo/logo.png")}
      style={{
        width: 156,
        height: 156,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Change your thoughts over time.
    </Header>
    <Paragraph
      style={{
        fontSize: 20,
      }}
    >
      Through practice, you’ll actively change your thoughts and feel a lot
      better.
    </Paragraph>
  </View>
);

const DockStep = ({ onContinue }) => (
  <View
    style={{
      height: "100%",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <Image
      source={require("../../assets/dock/dock.png")}
      style={{
        width: 256,
        height: 196,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 48,
      }}
    />
    <Header
      style={{
        fontSize: 28,
      }}
    >
      Put Quirk where you’ll find it again.
    </Header>

    <Paragraph
      style={{
        fontSize: 20,
        marginBottom: 18,
      }}
    >
      Quirk is a habit you build up. If you do it right, it can get you out of a
      bad place.
    </Paragraph>

    <Paragraph
      style={{
        fontSize: 20,
        marginBottom: 48,
      }}
    >
      To help yourself remember, try putting Quirk on the front page or the dock
      of your phone.
    </Paragraph>

    <ActionButton title="Continue" width="100%" onPress={onContinue} />
  </View>
);

export default class extends React.Component<ScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {
    activeSlide: 0,
  };

  constructor(props) {
    super(props);
    recordScreenCallOnFocus(this.props.navigation, "intro");
  }

  stopOnBoarding = () => {
    haptic.notification(Haptic.NotificationFeedbackType.Success);
    stats.endedOnboarding();
    this.props.navigation.replace(CBT_FORM_SCREEN, {
      fromOnboarding: true,
    });
  };

  _carousel = null;

  _renderItem = ({ item, index }) => {
    if (item.slug === "record") {
      return <RecordStep />;
    }

    if (item.slug === "challenge") {
      return <ChallengeStep />;
    }

    if (item.slug === "change") {
      return <ChangeStep />;
    }

    if (item.slug === "in-dock") {
      return <DockStep onContinue={this.stopOnBoarding} />;
    }

    return null;
  };

  render() {
    return (
      <Container
        style={{
          height: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: Constants.statusBarHeight + 12,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingBottom: 0,
        }}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={[
            { slug: "record" },
            { slug: "challenge" },
            { slug: "change" },
            { slug: "in-dock" },
          ]}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />

        <Pagination
          dotsLength={4}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{
            margin: 0,
            padding: 0,
            backgroundColor: "transparent",
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.pink,
          }}
          inactiveDotStyle={{
            backgroundColor: theme.gray,
          }}
        />
      </Container>
    );
  }
}
