import React from "react";
import { View } from "react-native";
import EmptyThoughtIllustration from "./EmptyThoughtIllustration";
import ThoughtItem from "./ThoughtItem";
import { Label } from "../ui";
import { SavedThought } from "../thoughts";
import { HistoryButtonLabelSetting } from "../setting";
import Constants from "expo-constants";
import NotEnoughThoughtsIllustration, {
  ENOUGH_DAYS,
} from "./NotEnoughThoughtsIllustration";
import { ExerciseGroup, isThought } from "../exercises/exercises";
import CheckUpCard from "../checkups/CheckUpCard";

interface ThoughtListProps {
  groups: ExerciseGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  navigateToViewer: (thought: SavedThought) => void;
}

const byReverseCreatedAt = (first, second) =>
  new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();

export default ({
  groups,
  navigateToViewer,
  historyButtonLabel,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return <EmptyThoughtIllustration />;
  }

  const items = groups.map(group => {
    const exercises = group.exercises.sort(byReverseCreatedAt).map(ex => {
      if (isThought(ex)) {
        return (
          <ThoughtItem
            key={ex.uuid}
            thought={ex}
            onPress={navigateToViewer}
            historyButtonLabel={historyButtonLabel}
          />
        );
      } else {
        return (
          <CheckUpCard key={ex.uuid} currentCheckup={ex} onPress={() => {}} />
        );
      }
    });

    const isToday =
      new Date(group.date).toDateString() === new Date().toDateString();

    return (
      <View
        key={group.date}
        style={{ paddingHorizontal: 24, paddingBottom: 12 }}
      >
        <Label>{isToday ? "Today" : new Date(group.date).toDateString()}</Label>
        {exercises}
      </View>
    );
  });

  return (
    <View
      style={{
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
