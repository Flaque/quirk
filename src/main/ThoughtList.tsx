import React from "react";
import { View } from "react-native";
import EmptyThoughtIllustration from "./EmptyThoughtIllustration";
import ThoughtItem from "./ThoughtItem";
import { Label } from "../ui";
import { ThoughtGroup, SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../setting";
import { THOUGHT_CARD_HIDDEN_HEIGHT } from "./ThoughtCard";
import { TAB_BAR_HEIGHT } from "../tabbar/TabBar";
import Constants from "expo-constants";

interface ThoughtListProps {
  groups: ThoughtGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  navigateToViewer: (thought: SavedThought) => void;
  onItemDelete: (thought: SavedThought) => void;
}

export default ({
  groups,
  navigateToViewer,
  onItemDelete,
  historyButtonLabel,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return (
      <View style={{ marginVertical: 48 }}>
        <EmptyThoughtIllustration />
      </View>
    );
  }

  const items = groups.map(group => {
    const thoughts = group.thoughts.map(thought => (
      <ThoughtItem
        key={thought.uuid}
        thought={thought}
        onPress={navigateToViewer}
        onDelete={onItemDelete}
        historyButtonLabel={historyButtonLabel}
      />
    ));

    const isToday =
      new Date(group.date).toDateString() === new Date().toDateString();

    return (
      <View key={group.date} style={{ padding: 24 }}>
        <Label>{isToday ? "Today" : group.date}</Label>
        {thoughts}
      </View>
    );
  });

  return (
    <View
      style={{
        marginBottom: THOUGHT_CARD_HIDDEN_HEIGHT - TAB_BAR_HEIGHT,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      {items}
    </View>
  );
};
