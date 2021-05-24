import React from "react";
import { View } from "react-native";
import { CapsLabel, Label, GhostButton, Row } from "../../ui";
import theme from "../../theme";
import { MARKDOWN_ARTICLE_SCREEN } from "../../screens";
import pulse from "../../articles/content/pulse";
import { AreaChart, Path } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { fill } from "lodash";
import {
  getPulseHistory,
  addScoreToHistory,
  consumeBoosts,
} from "./pulsestore";
import { Boost } from "./constants";
import { FadesIn } from "../../animations";
import AnimatedCounter from "./AnimatedCounter";
import { delay } from "lodash";
import { addTagsToUser } from "../../id";
import { THOUGHT_SCREEN } from "../screens";

const Line = ({ line, stroke }) => (
  <Path key={"line"} d={line} stroke={stroke} fill={"none"} animate={true} />
);

const Chart = ({ data }: { data: number[] }) => {
  // Really shouldn't happen
  if (data.length < 3) {
    return null;
  }

  return (
    <AreaChart
      style={{ height: 100 }}
      data={data}
      contentInset={{ top: 30, bottom: 30 }}
      curve={shape.curveCardinal}
      svg={{ fill: "rgba(119, 139, 235, 0.1)" }}
      animate={true}
      // if the person hasn't been using it for more than 3 days, give a set yMax so
      // the graph moves and they get some sort of progression
      yMax={data.filter(d => d !== 0).length <= 3 ? 50 : undefined}
    >
      <Line line={data} stroke={theme.blue} />
    </AreaChart>
  );
};

class BoostLabel extends React.Component<
  { boost: Boost },
  {
    isVisible: boolean;
  }
> {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    this.setState({ isVisible: true });
    setTimeout(() => {
      this.setState({
        isVisible: false,
      });
    }, 800);
  }

  render() {
    const { boost } = this.props;

    return (
      <FadesIn pose={this.state.isVisible ? "visible" : "hidden"}>
        <Row
          style={{
            position: "relative",
            zIndex: 5,
          }}
        >
          <Label
            style={{
              color: theme.blue,
              backgroundColor: theme.offwhite,
              borderRadius: 8,
              padding: 2,
            }}
          >
            +{boost.score}
            {" " + boost.label}
          </Label>
        </Row>
      </FadesIn>
    );
  }
}

export default class Pulse extends React.Component<
  ScreenProps,
  {
    data: number[];
    showLabel: boolean;
    showBoost: boolean;
    boostLabel: string;
    boostEffect: string;
    boosts: Boost[];
  }
> {
  state = {
    data: fill(Array(30), 0),
    showLabel: false,
    showBoost: false,
    boostLabel: "",
    boostEffect: "",
    boosts: [],
  };

  _refreshScore = async () => {
    let history = await getPulseHistory();
    if (history.length === 0) {
      return;
    }

    const scores = history.map(h => h.score);
    this.setState({
      data: scores,
    });

    addTagsToUser({
      awareness: `${scores[scores.length - 1]}`,
    });
  };

  async componentDidMount() {
    setTimeout(() => {
      this._refreshScore();
    }, 10);

    await this._refreshBoosts();

    this.props.navigation.addListener("didFocus", this._refreshBoosts);
  }

  _refreshBoosts = async () => {
    const boosts = await consumeBoosts();

    if (boosts.length === 0) {
      return;
    }

    for (let i = 0; i < boosts.length; i++) {
      delay(() => this._addBoost(boosts[i]), i * 1100);
    }
  };

  _addBoost = async (boost: Boost) => {
    const history = await addScoreToHistory(boost.score);

    this.setState(prevState => {
      return {
        ...prevState,
        boosts: [...prevState.boosts, boost],
      };
    });

    setTimeout(() => {
      this.setState({
        data: history.map(h => h.score),
      });
    }, 150);

    // Pop boosts
    setTimeout(() => {
      this.setState(prevState => {
        const b = [...prevState.boosts];
        b.pop();

        return {
          ...prevState,
          boosts: b,
        };
      });
    }, 950); // Don't make this more than 1000
  };

  render() {
    const { navigation } = this.props;
    const { data, boosts } = this.state;

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
              AWARENESS
            </CapsLabel>

            <Row>
              <AnimatedCounter
                value={data[data.length - 1]}
                time={300}
                keyFrames={8}
              />
            </Row>

            <View
              style={{
                height: 48,
              }}
            >
              {boosts.map(b => (
                <BoostLabel boost={b} />
              ))}
            </View>
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
                  nextScreen: THOUGHT_SCREEN,
                });
              }}
              textColor={theme.blue}
              style={{
                padding: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
              }}
            />
          </View>
        </View>

        <Chart data={data} />
      </View>
    );
  }
}
