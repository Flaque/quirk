import React from "react";
import { SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../SettingsScreen";
import theme from "../theme";
import { View } from "react-native";
import EmojiList from "./EmojiList";
import followUpState from "./followups/followUpState";
import {
  CardAttentionDot,
  TouchableCardContainer,
  CardCrown,
  CardTextContent,
  CardMutedContent,
  CardBadge,
} from "../card/TouchableCard";

export default ({
  thought,
  historyButtonLabel,
  onPress,
}: {
  thought: SavedThought;
  historyButtonLabel: HistoryButtonLabelSetting;
  onPress: (thought: SavedThought | boolean) => any;
}) => (
  <View
    style={{
      flex: 1,
    }}
  >
    {followUpState(thought) === "ready" && <CardAttentionDot />}
    <TouchableCardContainer onPress={() => onPress(thought)}>
      <CardCrown text="THOUGHT" featherIconName="message-square" />

      <CardTextContent
        text={
          historyButtonLabel === "alternative-thought"
            ? thought.alternativeThought
            : thought.automaticThought
        }
      />

      <CardMutedContent>
        <EmojiList thought={thought} />
      </CardMutedContent>

      {thought.immediateCheckup === "better" && (
        <CardBadge
          featherIconName="trending-up"
          text="Felt better after recording"
        />
      )}

      {thought.followUpCheckup === "better" && (
        <CardBadge featherIconName="trending-up" text="Felt better later on" />
      )}

      {followUpState(thought) === "scheduled" && (
        <CardBadge featherIconName="clipboard" text="Follow up scheduled" />
      )}

      {followUpState(thought) === "ready" && (
        <CardBadge
          featherIconName="play"
          text="Tap to start follow up"
          backgroundColor={theme.lightPink}
        />
      )}
    </TouchableCardContainer>
  </View>
);
