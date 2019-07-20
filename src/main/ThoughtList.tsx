import React from "react";
import { View, ScrollView } from "react-native";
import EmptyThoughtIllustration from "./EmptyThoughtIllustration";
import ThoughtItem from "./ThoughtItem";
import { Label } from "../ui";
import { ThoughtGroup, SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../setting";

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
      <View key={group.date} style={{ marginBottom: 18, padding: 24 }}>
        <Label>{isToday ? "Today" : group.date}</Label>
        {thoughts}
      </View>
    );
  });

  return <ScrollView style={{ bottom: 256 }}>{items}</ScrollView>;
};
