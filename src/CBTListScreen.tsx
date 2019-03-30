import React from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  View,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import { getExercises, deleteExercise } from "./store";
import { Header, Row, Container, IconButton, Label } from "./ui";
import theme from "./theme";
import { CBT_FORM_SCREEN } from "./screens";
import { SavedThought, ThoughtGroup, groupThoughtsByDay } from "./thoughts";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
} from "react-navigation";
import universalHaptic from "./haptic";
import { Haptic, Constants } from "expo";
import { validThoughtGroup } from "./sanitize";
import Alerter from "./alerter";
import alerts from "./alerts";

const ThoughtItem = ({ thought, onPress, onDelete }) => (
  <Row marginBottom={18}>
    <TouchableOpacity
      style={{
        padding: 18,
        backgroundColor: theme.lightGray,
        borderRadius: 13,
        borderLeftWidth: 18,
        borderLeftColor: theme.blue,
        flex: 1,
        marginRight: 18,
      }}
      onPress={() => onPress(thought)}
    >
      <Text
        style={{
          color: theme.lightText,
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        {thought.automaticThought}
      </Text>
    </TouchableOpacity>

    <IconButton
      alignSelf={"flex-start"}
      featherIconName={"trash"}
      onPress={() => onDelete(thought)}
    />
  </Row>
);

ThoughtItem.propTypes = {
  thought: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const EmptyThoughtIllustration = () => (
  <View
    style={{
      alignItems: "center",
      marginTop: 36,
    }}
  >
    <Image
      source={require("../assets/looker/Looker.png")}
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
  navigateToFormWithThought: (thought: SavedThought | boolean) => void;
  onItemDelete: (thought: SavedThought) => void;
}

const ThoughtItemList = ({
  groups,
  navigateToFormWithThought,
  onItemDelete,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return <EmptyThoughtIllustration />;
  }

  const items = groups.map(group => {
    const thoughts = group.thoughts.map(thought => (
      <ThoughtItem
        key={thought.uuid}
        thought={thought}
        onPress={navigateToFormWithThought}
        onDelete={onItemDelete}
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
}

class CBTListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { groups: [] };
  }

  syncExercises = (): void => {
    const fixTimestamps = (json): SavedThought => {
      const createdAt: Date = new Date(json.createdAt);
      const updatedAt: Date = new Date(json.updatedAt);
      return {
        createdAt,
        updatedAt,
        ...json,
      };
    };

    getExercises()
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
      .catch(console.error);
  };

  componentDidMount = () => {
    this.syncExercises();
    setTimeout(() => {
      this.setState({ showPopup: true });
    }, 100);
  };

  navigateToForm = () => {
    this.navigateToFormWithThought(false);
  };

  navigateToFormWithThought = (thought: SavedThought | boolean) => {
    this.props.navigation.navigate(CBT_FORM_SCREEN, {
      thought,
    });
  };

  onItemDelete = (thought: SavedThought) => {
    // Ignore the typescript error here, Expo's v31 has a bug
    // Upgrade to 32 when it's released to fix
    universalHaptic.notification(Haptic.NotificationFeedbackType.Success);

    deleteExercise(thought.uuid).then(() => this.syncExercises());
  };

  render() {
    const { groups } = this.state;

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
            <StatusBar barStyle="dark-content" />
            <Row marginBottom={18}>
              <Header>quirk.</Header>
              <IconButton
                featherIconName={"edit"}
                onPress={() => this.navigateToForm()}
              />
            </Row>

            <ThoughtItemList
              groups={groups}
              navigateToFormWithThought={this.navigateToFormWithThought}
              onItemDelete={this.onItemDelete}
            />
          </Container>
        </ScrollView>
        <Alerter alerts={alerts} />
      </View>
    );
  }
}

export default CBTListScreen;
