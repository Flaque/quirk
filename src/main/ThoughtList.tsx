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
import dayjs from "dayjs";
import NotEnoughThoughtsIllustration, {
  ENOUGH_DAYS,
} from "./NotEnoughThoughtsIllustration";

interface ThoughtListProps {
  groups: ThoughtGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  navigateToViewer: (thought: SavedThought) => void;
}

const byDate = (a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1);
const byCreatedAt = (a, b) =>
  dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1;

export default ({
  groups,
  navigateToViewer,
  historyButtonLabel,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return (
      <View
        style={{
          marginBottom: THOUGHT_CARD_HIDDEN_HEIGHT - TAB_BAR_HEIGHT + 48,
        }}
      >
        <EmptyThoughtIllustration />
      </View>
    );
  }

  const items = groups.sort(byDate).map(group => {
    const thoughts = group.thoughts
      .sort(byCreatedAt)
      .map(thought => (
        <ThoughtItem
          key={thought.uuid}
          thought={thought}
          onPress={navigateToViewer}
          historyButtonLabel={historyButtonLabel}
        />
      ));

    const isToday =
      new Date(group.date).toDateString() === new Date().toDateString();

    return (
      <View
        key={group.date}
        style={{ paddingHorizontal: 24, paddingBottom: 12 }}
      >
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
      {items.length < ENOUGH_DAYS && (
        <NotEnoughThoughtsIllustration count={items.length} />
      )}
      {items}
    </View>
  );
};
