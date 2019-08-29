import React from "react";
import {
  TouchableCardContainer,
  CardCrown,
  CardTextContent,
  CardMutedContent,
} from "../../card/TouchableCard";
import { Prediction } from "./predictionstore";
import { Text } from "react-native";
import theme from "../../theme";
import dayjs from "dayjs";

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

      <CardTextContent text={prediction.eventLabel} />

      <CardMutedContent>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 14,
            color: theme.veryLightText,
          }}
        >
          *Result revealed on{" "}
          {dayjs(prediction.followUpAt)
            .toDate()
            .toDateString()}
          *
        </Text>
      </CardMutedContent>
    </TouchableCardContainer>
  );
};

export default PredictionCard;
