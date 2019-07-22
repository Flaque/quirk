import React from "react";
import { SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../SettingsScreen";
import { Paragraph, Label } from "../ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../theme";
import { View, Text } from "react-native";
import { take } from "lodash";
import { emojiForSlug } from "../distortions";
import { Feather } from "@expo/vector-icons";
import EmojiList from "./EmojiList";

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
      <EmojiList thought={thought} />
    </View>
    {thought.immediateCheckup === "better" && (
      <View
        style={{
          backgroundColor: theme.lightBlue,
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 12,
          paddingTop: 12,
          margin: 4,
          borderRadius: 8,
          justifyContent: "space-between",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: theme.lightText,
            fontSize: 14,
          }}
        >
          Felt better afterwards
        </Text>
        <Feather name={"trending-up"} size={16} color={theme.lightText} />
      </View>
    )}
  </TouchableOpacity>
);
