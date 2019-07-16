import React from "react";
import { SubHeader, RoundedSelector } from "../ui";
import { View, ScrollView } from "react-native";
import i18n from "../i18n";
import { CognitiveDistortion } from "../distortions";
import * as stats from "../stats";

export default class extends React.Component<{
  distortions: CognitiveDistortion[];
  onChange: (slug: string) => void;
}> {
  onPressSlug = async slug => {
    this.props.onChange(slug);
    stats.userFilledOutFormField("distortions");
    stats.userCheckedDistortion(slug);
  };

  render() {
    const { distortions = [] } = this.props;

    return (
      <>
        <ScrollView>
          <View
            style={{
              paddingBottom: 84,
            }}
          >
            <SubHeader
              style={{
                marginBottom: 6,
              }}
            >
              {i18n.t("cog_distortion")}
            </SubHeader>
            <RoundedSelector items={distortions} onPress={this.onPressSlug} />
          </View>
        </ScrollView>
      </>
    );
  }
}
