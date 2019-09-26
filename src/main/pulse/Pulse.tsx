import React from "react";
import { View } from "react-native";
import { CapsLabel, Label, GhostButton, Row } from "../../ui";
import theme from "../../theme";
import { MARKDOWN_ARTICLE_SCREEN } from "../../screens";
import pulse from "../../articles/content/pulse";
import { AreaChart, Path } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { fill } from "lodash";
import { getPulseHistory, addScoreToHistory } from "./pulsestore";
import { Boost, START_PREDICTION } from "./constants";
import { FadesIn } from "../../animations";
import AnimatedCounter from "./AnimatedCounter";

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
      // if the person hasn't been using it for more than 3 days, give a low yMax so
      // the graph moves and they get some sort of progression
      yMax={data.filter(d => d !== 0).length <= 3 ? 13 : undefined}
    >
      <Line line={data} stroke={theme.blue} />
    </AreaChart>
  );
};

export default class Pulse extends React.Component<
  ScreenProps,
  {
    data: number[];
    showLabel: boolean;
    showBoost: boolean;
    boostLabel: string;
    boostEffect: string;
  }
> {
  state = {
    data: fill(Array(30), 0),
    showLabel: false,
    showBoost: false,
    boostLabel: "",
    boostEffect: "",
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
  };

  async componentDidMount() {
    setTimeout(() => {
      this._refreshScore();
    }, 100);

    setTimeout(() => {
      this._addBoost(START_PREDICTION);
    }, 1000);
  }

  _addBoost = async (boost: Boost) => {
    const history = await addScoreToHistory(boost.score);

    this.setState({
      showBoost: true,
      boostLabel: boost.label,
      boostEffect: `${boost.score}`,
    });

    setTimeout(() => {
      this.setState({
        data: history.map(h => h.score),
      });
    }, 600);

    setTimeout(() => {
      this.setState({
        showBoost: false,
      });
    }, 1000);
  };

  render() {
    const { navigation } = this.props;
    const { data, showBoost, boostEffect, boostLabel } = this.state;

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

            <Row>
              <AnimatedCounter
                value={data[data.length - 1]}
                time={300}
                keyFrames={8}
              />
            </Row>
            <FadesIn pose={showBoost ? "visible" : "hidden"}>
              <Row>
                <Label
                  style={{
                    color: theme.blue,
                    backgroundColor: theme.offwhite,
                    borderRadius: 8,
                    padding: 2,
                  }}
                >
                  +{boostEffect}
                  {" " + boostLabel}
                </Label>
              </Row>
            </FadesIn>
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
  }
}
