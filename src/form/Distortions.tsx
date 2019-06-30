import React from "react";
import {
  SubHeader,
  RoundedSelector,
  FloatingCard,
  Paragraph,
  ActionButton,
  Row,
} from "../ui";
import { View, ScrollView, Linking } from "react-native";
import i18n from "../i18n";
import { CognitiveDistortion } from "../distortions";
import theme from "../theme";

function select(distortions, slug) {
  return distortions.map(dist => {
    if (dist.slug === slug) {
      dist.selected = true;
      return dist;
    }
    return dist;
  });
}

export default ({
  distortions = [],
  onChange,
  isOnboarding,
}: {
  distortions: CognitiveDistortion[];
  onChange: (slug: string) => void;
  isOnboarding?: boolean;
}) => {
  // If we're in onboarding, select the mind-reading distortion for the user
  let dists = isOnboarding ? select(distortions, "mind-reading") : distortions;

  return (
    <>
      <ScrollView>
        <View
          style={{
            paddingBottom: 48,
          }}
        >
          {isOnboarding && (
            <FloatingCard
              style={{
                position: "relative",
                marginBottom: 18,
              }}
            >
              <SubHeader>Distortions are like logical fallacies 💡</SubHeader>
              <Paragraph
                style={{
                  marginBottom: 24,
                }}
              >
                Psychiatrists have classified these as the most common ways our
                thoughts get distorted.
              </Paragraph>

              <Paragraph>
                Scroll down to see one distortion we've already marked. Can you
                find any others?
              </Paragraph>
            </FloatingCard>
          )}

          <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
          <RoundedSelector items={dists} onPress={onChange} />

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
