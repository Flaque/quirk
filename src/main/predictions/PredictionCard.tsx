import React from "react";

import {
  TouchableCardContainer,
  CardCrown,
  CardMutedContent,
  CardBadge,
} from "../../card/TouchableCard";
import dayjs from "dayjs";
import { Text } from "react-native";
import theme from "../../theme";
import { Prediction } from "./predictionstore";

const PredictionCard = ({
  prediction,
  onPress,
}: {
  prediction: Prediction;
  onPress: (checkup: Prediction) => any;
}) => {
  return (
    <TouchableCardContainer onPress={() => onPress(prediction)}>
      <CardCrown text={"PREDICTION"} featherIconName={"cloud-drizzle"} />

      <CardMutedContent>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 14,
            color: theme.veryLightText,
          }}
        >
          Recorded on{" "}
          {dayjs(prediction.createdAt)
            .toDate()
            .toDateString()}
        </Text>
      </CardMutedContent>
    </TouchableCardContainer>
  );
};

export default PredictionCard;
