import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native";
import { getThoughts, deleteThought } from "../thoughtstore";
import { Header, Row, Container, IconButton, Label, Paragraph } from "../ui";
import theme from "../theme";
import { CBT_FORM_SCREEN, SETTING_SCREEN, CBT_VIEW_SCREEN } from "../screens";
import { SavedThought, ThoughtGroup, groupThoughtsByDay } from "../thoughts";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import universalHaptic from "../haptic";
import Constants from "expo-constants";
import * as Haptic from "expo-haptics";
import { validThoughtGroup } from "../sanitize";
import Alerter from "../alerter";
import alerts from "../alerts";
import {
  HistoryButtonLabelSetting,
  getHistoryButtonLabel,
} from "../SettingsScreen";
import i18n from "../i18n";
import { emojiForSlug } from "../distortions";
import { take } from "lodash";
import { recordScreenCallOnFocus } from "../navigation";
import { FadesIn } from "../animations";

const ThoughtItem = ({
  thought,
  historyButtonLabel,
  onPress,
  onDelete,
}: {
  thought: SavedThought;
  historyButtonLabel: HistoryButtonLabelSetting;
  onPress: (thought: SavedThought | boolean) => void;
  onDelete: (thought: SavedThought) => void;
}) => (
  <Row style={{ marginBottom: 18 }}>
    <TouchableOpacity
      onPress={() => onPress(thought)}
      style={{
        backgroundColor: "white",
        borderColor: theme.lightGray,
        borderBottomWidth: 2,
        borderRadius: 8,
        borderWidth: 1,
        marginRight: 18,
        flex: 1,
      }}
    >
      <Paragraph
        style={{
          color: theme.darkText,
          fontWeight: "400",
          fontSize: 16,
          marginBottom: 8,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 12,
          paddingBottom: 6,
        }}
      >
        {historyButtonLabel === "alternative-thought"
          ? thought.alternativeThought
          : thought.automaticThought}
      </Paragraph>

      <View
        style={{
          backgroundColor: theme.lightOffwhite,
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 12,
          paddingTop: 6,
          margin: 4,
          borderRadius: 8,
        }}
      >
        <Paragraph>
          {take(
            thought.cognitiveDistortions
              .filter(n => n) // Filters out any nulls or undefineds which can crop up
              .filter(distortion => distortion.selected)
              .map(dist => emojiForSlug(dist.slug)),
            8 // only take a max of 8
          )
            .filter(n => n)
            .join(" ")
            .trim()}
        </Paragraph>
      </View>
    </TouchableOpacity>

    <IconButton
      style={{
        alignSelf: "flex-start",
      }}
      accessibilityLabel={i18n.t("accessibility.delete_thought_button")}
      featherIconName={"trash"}
      onPress={() => onDelete(thought)}
    />
  </Row>
);

const EmptyThoughtIllustration = () => (
  <View
    style={{
      alignItems: "center",
      marginTop: 36,
    }}
  >
    <Image
      source={require("../../assets/looker/Looker.png")}
      style={{
        width: 200,
        height: 150,
        alignSelf: "center",
        marginBottom: 32,
      }}
    />
    <Label marginBottom={18} textAlign={"center"}>
      No thoughts yet!
    </Label>
  </View>
);

interface ThoughtListProps {
  groups: ThoughtGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  navigateToViewer: (thought: SavedThought) => void;
  onItemDelete: (thought: SavedThought) => void;
}

const ThoughtItemList = ({
  groups,
  navigateToViewer,
  onItemDelete,
  historyButtonLabel,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return <EmptyThoughtIllustration />;
  }

  const items = groups.map(group => {
    const thoughts = group.thoughts.map(thought => (
      <ThoughtItem
        key={thought.uuid}
        thought={thought}
        onPress={navigateToViewer}
        onDelete={onItemDelete}
        historyButtonLabel={historyButtonLabel}
      />
    ));

    const isToday =
      new Date(group.date).toDateString() === new Date().toDateString();

    return (
      <View key={group.date} style={{ marginBottom: 18 }}>
        <Label>{isToday ? "Today" : group.date}</Label>
        {thoughts}
      </View>
    );
  });

  return <>{items}</>;
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}

interface State {
  groups: ThoughtGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  isReady: boolean;
}

class CBTListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      historyButtonLabel: "alternative-thought",
      isReady: false,
    };

    this.props.navigation.addListener("willFocus", () => {
      this.loadSettings();
    });

    recordScreenCallOnFocus(this.props.navigation, "list");
  }

  loadExercises = (): void => {
    const fixTimestamps = (json): SavedThought => {
      const createdAt: Date = new Date(json.createdAt);
      const updatedAt: Date = new Date(json.updatedAt);
      return {
        createdAt,
        updatedAt,
        ...json,
      };
    };

    getThoughts()
      .then(data => {
        const thoughts: SavedThought[] = data
          .map(([_, value]) => JSON.parse(value))
          .filter(n => n) // Worst case scenario, if bad data gets in we don't show it.
          .map(fixTimestamps);

        const groups: ThoughtGroup[] = groupThoughtsByDay(thoughts).filter(
          validThoughtGroup
        );

        this.setState({ groups });
      })
      .catch(console.error)
      .finally(() => {
        this.setState({
          isReady: true,
        });
      });
  };

  loadSettings = (): void => {
    getHistoryButtonLabel().then(historyButtonLabel => {
      this.setState({ historyButtonLabel });
    });
  };

  componentDidMount = () => {
    this.loadExercises();
    this.loadSettings();
  };

  navigateToSettings = () => {
    this.props.navigation.push(SETTING_SCREEN);
  };

  navigateToForm = () => {
    universalHaptic.impact(Haptic.ImpactFeedbackStyle.Light);
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought: false,
    });
  };

  navigateToViewerWithThought = (thought: SavedThought) => {
    this.props.navigation.push(CBT_VIEW_SCREEN, {
      thought,
    });
  };

  onItemDelete = (thought: SavedThought) => {
    // Ignore the typescript error here, Expo's v31 has a bug
    // Upgrade to 32 when it's released to fix
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);

    deleteThought(thought.uuid).then(() => this.loadExercises());
  };

  render() {
    const { groups, historyButtonLabel, isReady } = this.state;

    return (
      <View style={{ backgroundColor: theme.lightOffwhite }}>
        <ScrollView
          style={{
            backgroundColor: theme.lightOffwhite,
            marginTop: Constants.statusBarHeight,
            paddingTop: 24,
            height: "100%",
          }}
        >
          <Container>
            <StatusBar barStyle="dark-content" translucent={true} />
            <Row style={{ marginBottom: 18 }}>
              <Header allowFontScaling={false}>.quirk</Header>

              <View style={{ flexDirection: "row" }}>
                <IconButton
                  featherIconName={"settings"}
                  onPress={() => this.navigateToSettings()}
                  accessibilityLabel={i18n.t("accessibility.settings_button")}
                  style={{ marginRight: 18 }}
                />
                <IconButton
                  featherIconName={"x"}
                  onPress={() => this.navigateToForm()}
                  accessibilityLabel={i18n.t(
                    "accessibility.new_thought_button"
                  )}
                />
              </View>
            </Row>

            <FadesIn pose={isReady ? "visible" : "hidden"}>
              <ThoughtItemList
                groups={groups}
                navigateToViewer={this.navigateToViewerWithThought}
                onItemDelete={this.onItemDelete}
                historyButtonLabel={historyButtonLabel}
              />
            </FadesIn>
          </Container>
        </ScrollView>
        <Alerter alerts={alerts} />
      </View>
    );
  }
}

export default CBTListScreen;
