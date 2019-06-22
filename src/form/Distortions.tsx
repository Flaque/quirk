import React from "react";
import { SubHeader, RoundedSelector } from "../ui";
import { View, ScrollView } from "react-native";
import i18n from "../i18n";
import { CognitiveDistortion } from "../distortions";

export default ({
  distortions = [],
  onChange,
}: {
  distortions: CognitiveDistortion[];
  onChange: (slug: string) => void;
}) => (
  <ScrollView>
    <View>
      <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
      <RoundedSelector items={distortions} onPress={onChange} />
    </View>
  </ScrollView>
);
