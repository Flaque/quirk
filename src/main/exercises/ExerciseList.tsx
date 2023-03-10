import React from "react";
import { View } from "react-native";
import EmptyThoughtIllustration from "../EmptyThoughtIllustration";
import ThoughtItem from "../ThoughtItem";
import { Label } from "../../ui";
import { SavedThought } from "../../thoughts";
import { HistoryButtonLabelSetting } from "../../setting";
import Constants from "expo-constants";
import NotEnoughThoughtsIllustration, {
  ENOUGH_DAYS,
} from "../NotEnoughThoughtsIllustration";
import { ExerciseGroup, isCheckup, isThought, isPrediction } from "./exercises";
import CheckUpCard from "../../checkups/CheckUpCard";
import { Checkup } from "../../checkups/checkupstore";
import PredictionCard from "../predictions/PredictionCard";
import { Prediction } from "../predictions/predictionstore";

interface ThoughtListProps {
  groups: ExerciseGroup[];
  historyButtonLabel: HistoryButtonLabelSetting;
  navigateToThoughtViewer: (thought: SavedThought) => void;
  navigateToCheckupViewer: (checkup: Checkup) => void;
  navigateToPredictionViewer: (prediction: Prediction) => void;
}

const byReverseCreatedAt = (first, second) =>
  new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();

export default ({
  groups,
  navigateToThoughtViewer,
  navigateToCheckupViewer,
  navigateToPredictionViewer,
  historyButtonLabel,
}: ThoughtListProps) => {
  if (!groups || groups.length === 0) {
    return <EmptyThoughtIllustration />;
  }

  const items = groups.map(group => {
    const exercises = group.exercises.sort(byReverseCreatedAt).map(ex => {
      if (isCheckup(ex)) {
        return (
          <CheckUpCard
            key={ex.uuid}
            currentCheckup={ex}
            onPress={() => navigateToCheckupViewer(ex)}
          />
        );
      }
      if (isPrediction(ex)) {
        return (
          <PredictionCard
            key={ex.uuid}
            prediction={ex}
            onPress={navigateToPredictionViewer}
          />
        );
      }
      if (isThought(ex)) {
        return (
          <ThoughtItem
            key={ex.uuid}
            thought={ex}
            onPress={navigateToThoughtViewer}
            historyButtonLabel={historyButtonLabel}
          />
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
      {items}
    </View>
  );
};
