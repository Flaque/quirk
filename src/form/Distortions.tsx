import React from "react";
import {
  SubHeader,
  RoundedSelector,
  Paragraph,
  ActionButton,
  Row,
} from "../ui";
import { View, ScrollView, Linking } from "react-native";
import i18n from "../i18n";
import { CognitiveDistortion } from "../distortions";
import theme from "../theme";

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
          <Paragraph
            style={{
              marginBottom: 18,
            }}
          >
            Is this thought distorted?
          </Paragraph>
          <RoundedSelector items={distortions} onPress={onChange} />

          <Row
            style={{
              marginTop: 18,
            }}
          >
            <ActionButton
              flex={1}
              title={"Learn More"}
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              width={"100%"}
              onPress={() => {
                Linking.canOpenURL("https://quirk.fyi/distortions").then(() =>
                  Linking.openURL("https://quirk.fyi/distortions")
                );
              }}
            />
          </Row>
        </View>
      </ScrollView>
    </>
  );
};
