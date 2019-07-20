import React from "react";
import { SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../SettingsScreen";
import { Paragraph } from "../ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../theme";
import { View } from "react-native";
import { take } from "lodash";
import { emojiForSlug } from "../distortions";

export default ({
  thought,
  historyButtonLabel,
  onPress,
}: {
  thought: SavedThought;
  historyButtonLabel: HistoryButtonLabelSetting;
  onPress: (thought: SavedThought | boolean) => void;
}) => (
  <TouchableOpacity
    onPress={() => onPress(thought)}
    style={{
      backgroundColor: "white",
      borderColor: theme.lightGray,
      borderBottomWidth: 2,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 18,
      flex: 1,
    }}
  >
    <Paragraph
      style={{
        color: theme.darkText,
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 6,
      }}
    >
      {historyButtonLabel === "alternative-thought"
        ? thought.alternativeThought
        : thought.automaticThought}
    </Paragraph>

    <View
      style={{
        backgroundColor: theme.lightOffwhite,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingTop: 6,
        margin: 4,
        borderRadius: 8,
      }}
    >
      <Paragraph>
        {take(
          thought.cognitiveDistortions
            .filter(n => n) // Filters out any nulls or undefineds which can crop up
            .filter(distortion => distortion.selected)
            .map(dist => emojiForSlug(dist.slug)),
          8 // only take a max of 8
        )
          .filter(n => n)
          .join(" ")
          .trim()}
      </Paragraph>
    </View>
  </TouchableOpacity>
);
