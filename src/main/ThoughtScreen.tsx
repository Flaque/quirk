import React from "react";
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
import { Label, CapsLabel, GhostButton } from "../ui";
import Feed from "./feed/Feed";
import { MARKDOWN_ARTICLE_SCREEN } from "../screens";
import { AreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Path } from "react-native-svg";
import pulse from "../articles/content/pulse";

const Chart = ({ data }) => {
  const Line = ({ line }) => (
    <Path key={"line"} d={line} stroke={theme.blue} fill={"none"} />
  );

  return (
    <AreaChart
      style={{ height: 100 }}
      data={data}
      contentInset={{ top: 30, bottom: 30 }}
      curve={shape.curveNatural}
      svg={{ fill: "rgba(119, 139, 235, 0.1)" }}
    >
      <Line line={data} />
    </AreaChart>
  );
};

const Progress = ({ navigation }: ScreenProps) => {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 100];
  return (
    <View
      style={{
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 24,
        }}
      >
        <View>
          <CapsLabel
            style={{
              fontSize: 12,
              marginBottom: 6,
              color: theme.veryLightText,
            }}
          >
            PULSE
          </CapsLabel>

          <Label
            style={{
              color: theme.lightText,
            }}
          >
            80
          </Label>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            marginBottom: 12,
          }}
        >
          <GhostButton
            title="what is this?"
            onPress={() => {
              navigation.navigate(MARKDOWN_ARTICLE_SCREEN, {
                title: pulse.title,
                description: pulse.description,
                pages: pulse.pages,
              });
            }}
            textColor={theme.blue}
            style={{
              padding: 0,
              borderWidth: 0,
              borderBottomWidth: 0,
              marginTop: 6,
            }}
          />
        </View>
      </View>

      <Chart data={data} />
    </View>
  );
};

const ExerciseButtons = ({
  navigation,
}: {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>;
}) => (
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
    <Progress navigation={navigation} />
    <ExerciseButton
      title="New Prediction"
      hint="Manage anxiety around upcoming events or tasks."
      featherIconName="cloud-drizzle"
      onPress={async () => {
        userStartedPrediction();

        if (!(await flagstore.get("has-seen-prediction-onboarding", "false"))) {
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
