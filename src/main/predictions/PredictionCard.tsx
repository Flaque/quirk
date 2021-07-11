import React from "react";
import {
  TouchableCardContainer,
  CardCrown,
  CardTextContent,
  CardMutedContent,
  CardBadge,
  CardAttentionDot,
} from "../../card/TouchableCard";
import { Prediction } from "./predictionstore";
import { Text } from "react-native";
import theme from "../../theme";
import dayjs from "dayjs";
import { getPredictionResult, getPredictionState } from "./results";

const PredictionCard = ({
  prediction,
  onPress,
}: {
  prediction: Prediction;
  onPress: (checkup: Prediction) => any;
}) => {
  return (
    <>
      {getPredictionState(prediction) === "ready" && <CardAttentionDot />}

      <TouchableCardContainer onPress={() => onPress(prediction)}>
        <CardCrown text={"PREDICTION"} featherIconName={"cloud-drizzle"} />

        <CardTextContent text={prediction.eventLabel} />

        {getPredictionState(prediction) === "ready" && (
          <CardBadge
            featherIconName="play"
            text="Tap to start follow up"
            backgroundColor={theme.lightPink}
          />
        )}

        {getPredictionState(prediction) === "waiting" && (
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
        )}

        {getPredictionState(prediction) === "complete" &&
          getPredictionResult(prediction) === "correct" && (
            <CardMutedContent>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: theme.veryLightText,
                }}
              >
                Went as expected
              </Text>
            </CardMutedContent>
          )}

        {getPredictionState(prediction) === "complete" &&
          getPredictionResult(prediction) === "better" && (
            <CardBadge
              text="Better than expected"
              featherIconName="trending-up"
            />
          )}
      </TouchableCardContainer>
    </>
  );
};

export default PredictionCard;
