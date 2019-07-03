import React from "react";
import { SubHeader, RoundedSelector } from "../ui";
import { View, ScrollView } from "react-native";
import i18n from "../i18n";
import { CognitiveDistortion } from "../distortions";
import * as stats from "../stats";

export default ({
  distortions = [],
  onChange,
}: {
  distortions: CognitiveDistortion[];
  onChange: (slug: string) => void;
}) => {
  return (
    <>
      <ScrollView>
        <View
          style={{
            paddingBottom: 48,
          }}
        >
          <SubHeader
            style={{
              marginBottom: 6,
            }}
          >
            {i18n.t("cog_distortion")}
          </SubHeader>
          <RoundedSelector
            items={distortions}
            onPress={slug => {
              stats.userFilledOutFormField("distortions");
              stats.userCheckedDistortion(slug);
              onChange(slug);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
