import React from "react";
import { View } from "react-native";
import { CapsLabel, Label, GhostButton } from "../../ui";
import theme from "../../theme";
import { MARKDOWN_ARTICLE_SCREEN } from "../../screens";
import pulse from "../../articles/content/pulse";
import { AreaChart, Path } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { fill } from "lodash";
import { getPulseHistory } from "./pulsestore";

const Line = ({ line }) => (
  <Path
    key={"line"}
    d={line}
    stroke={theme.blue}
    fill={"none"}
    animate={true}
  />
);

const Chart = ({ data }) => {
  return (
    <AreaChart
      style={{ height: 100 }}
      data={data}
      contentInset={{ top: 30, bottom: 30 }}
      curve={shape.curveNatural}
      svg={{ fill: "rgba(119, 139, 235, 0.1)" }}
      animate={true}
    >
      <Line line={data} />
    </AreaChart>
  );
};

export default class Pulse extends React.Component<
  ScreenProps,
  {
    data: number[];
  }
> {
  state = {
    data: fill(Array(30), 0),
  };

  _refreshScore = async () => {
    let history = await getPulseHistory();
    if (history.length === 0) {
      return;
    }

    this.setState({
      data: history.map(h => h.score),
    });
  };

  async componentDidMount() {
    setTimeout(() => {
      this._refreshScore();
    }, 100);
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;

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
              {data[data.length - 1]}
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
  }
}
