import React from "react";
import { SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../SettingsScreen";
import { Paragraph, Badge } from "../ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../theme";
import { View } from "react-native";
import EmojiList from "./EmojiList";
import followUpState from "./followups/followUpState";

export default ({
  thought,
  historyButtonLabel,
  onPress,
}: {
  thought: SavedThought;
  historyButtonLabel: HistoryButtonLabelSetting;
  onPress: (thought: SavedThought | boolean) => void;
}) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {followUpState(thought) === "ready" && (
      <View
        style={{
          backgroundColor: theme.pink,
          position: "relative",
          top: 12,
          right: -6,
          width: 18,
          height: 18,
          zIndex: 999,
          borderRadius: 18,
          alignSelf: "flex-end",
        }}
      />
    )}
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
        <Badge
          featherIconName="trending-up"
          text="Felt better after recording"
          style={{
            margin: 4,
          }}
        />
      )}

      {thought.followUpCheckup === "better" && (
        <Badge
          featherIconName="trending-up"
          text="Felt better later on"
          style={{
            margin: 4,
          }}
        />
      )}

      {followUpState(thought) === "scheduled" && (
        <Badge
          featherIconName="clipboard"
          text="Follow up scheduled"
          style={{
            margin: 4,
          }}
        />
      )}

      {followUpState(thought) === "ready" && (
        <Badge
          featherIconName="play"
          text="Tap to start follow up"
          backgroundColor={theme.lightPink}
          style={{
            margin: 4,
          }}
        />
      )}
    </TouchableOpacity>
  </View>
);
