import React, { useEffect, useState } from "react";
import ScreenProps from "../ScreenProps";
import { View, StatusBar } from "react-native";
import { getIsExistingUser, setIsExistingUser } from "../thoughtstore";
import { newThought, Thought } from "../thoughts";
import {
  PREDICTION_ONBOARDING_SCREEN,
  ASSUMPTION_SCREEN,
  AUTOMATIC_THOUGHT_SCREEN,
} from "./screens";
import * as stats from "../stats";
import Constants from "expo-constants";
import theme from "../theme";
import { get } from "lodash";
import { countExercises } from "./exercises/exercises";
import { userStartedPrediction } from "./predictions/stats";
import * as flagstore from "../flagstore";
import { addTagsToUser } from "../id";
import ExerciseButton from "./exercises/ExerciseButton";
import {
  NavigationScreenProp,
  NavigationAction,
  NavigationState,
} from "react-navigation";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import Feed from "./feed/Feed";
import Pulse from "./pulse/Pulse";
import { passesFeatureFlag } from "../featureflags";

const ExerciseButtons = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}) => {
  const [showProgression, setShowProgression] = useState(false);
  useEffect(() => {
    passesFeatureFlag("awareness-1", 3).then(passes => {
      setShowProgression(!!passes);
    });
  });

  return (
    <View
      style={{
        backgroundColor: theme.offwhite,
        borderTopWidth: 1,
        borderColor: theme.lightGray,
        paddingTop: 12,
        paddingBottom: 24,
      }}
    >
      {/* <ExerciseButton
      hasYourAttention={true}
      title="Do this first!"
      hint="Learn about CBT and how it can help you."
      featherIconName="book-open"
      onPress={() =>
        navigation.navigate(MARKDOWN_ARTICLE_SCREEN, {
          pages: cbt101.pages,
          title: cbt101.title,
          description: cbt101.description,
        })
      }
    /> */}
      {showProgression && <Pulse navigation={navigation} />}
      <ExerciseButton
        title="New Prediction"
        hint="Manage anxiety around upcoming events or tasks."
        featherIconName="cloud-drizzle"
        onPress={async () => {
          userStartedPrediction();

          if (
            !(await flagstore.get("has-seen-prediction-onboarding", "false"))
          ) {
            navigation.navigate(PREDICTION_ONBOARDING_SCREEN);
            flagstore.setTrue("has-seen-prediction-onboarding");
            return;
          }

          navigation.navigate(ASSUMPTION_SCREEN);
        }}
      />
      <ExerciseButton
        title="New Automatic Thought"
        hint="Challenge your in-the-moment automatic negative thoughts."
        featherIconName="message-square"
        onPress={() => navigation.navigate(AUTOMATIC_THOUGHT_SCREEN)}
      />
    </View>
  );
};

export default class MainScreen extends React.Component<
  ScreenProps,
  {
    thought?: Thought;
  }
> {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      thought: undefined,
    };
  }

  componentDidMount() {
    // Record new users
    getIsExistingUser().then(isExisting => {
      // New Users
      if (!isExisting) {
        stats.newuser();
        setIsExistingUser();
      }
    });

    this.props.navigation.addListener("willFocus", args => {
      const thought = get(args, "action.params.thought", newThought());
      this.setState({
        thought,
      });
    });

    // Count number exercises so we know when things are breaking
    countExercises().then(exerciseCount => {
      addTagsToUser({
        exerciseCount: `${exerciseCount}`,
      });
    });
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "white",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <StatusBar barStyle="dark-content" hidden={false} />

        <InvertibleScrollView
          inverted
          style={{
            flex: 1,
          }}
        >
          <ExerciseButtons navigation={this.props.navigation} />
          <Feed navigation={this.props.navigation} />
        </InvertibleScrollView>
      </View>
    );
  }
}
