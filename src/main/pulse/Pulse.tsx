import React from "react";
import { ScreenProps } from "react-navigation";
import { View } from "react-native";
import { CapsLabel, Label, GhostButton } from "../../ui";
import theme from "../../theme";
import { MARKDOWN_ARTICLE_SCREEN } from "../../screens";
import pulse from "../../articles/content/pulse";
import { AreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Path } from "react-native-svg";

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

export default class Pulse extends React.Component<ScreenProps> {
  render() {
    const { navigation } = this.props;

    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      100,
    ];
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
  }
}
