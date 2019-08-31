import React from "react";

import {
  TouchableCardContainer,
  CardCrown,
  CardMutedContent,
  CardBadge,
} from "../card/TouchableCard";
import { Checkup } from "./checkupstore";
import dayjs from "dayjs";
import { Text } from "react-native";
import theme from "../theme";

const CheckUpCard = ({
  currentCheckup,
  onPress,
}: {
  currentCheckup: Checkup;
  onPress: (checkup: Checkup) => any;
}) => {
  return (
    <TouchableCardContainer onPress={() => onPress(currentCheckup)}>
      <CardCrown text={"MILESTONE"} featherIconName={"compass"} />

      <CardMutedContent>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 14,
            color: theme.veryLightText,
          }}
        >
          Recorded on{" "}
          {dayjs(currentCheckup.createdAt)
            .toDate()
            .toDateString()}
        </Text>
      </CardMutedContent>

      {currentCheckup.currentMood === "good" && (
        <CardBadge featherIconName="trending-up" text="Doing well" />
      )}
    </TouchableCardContainer>
  );
};

export default CheckUpCard;
