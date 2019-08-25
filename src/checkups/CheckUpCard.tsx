import React from "react";

import {
  TouchableCardContainer,
  CardCrown,
  CardMutedContent,
} from "../card/TouchableCard";
import { Checkup } from "./checkupstore";
import dayjs from "dayjs";
import { Text } from "react-native";
import theme from "../theme";

const UnfinishedCard = ({ currentCheckup }) => (
  <CardMutedContent>
    <Text
      style={{
        fontWeight: "700",
        fontSize: 14,
        color: theme.veryLightText,
      }}
    >
      Come back after your next checkup on{" "}
      {dayjs(currentCheckup.date)
        .add(7, "day")
        .format("DD-MM-YYYY")}{" "}
      to see these results.
    </Text>
  </CardMutedContent>
);

const CheckUpCard = ({
  nextCheckup,
  currentCheckup,
  onPress,
}: {
  nextCheckup?: Checkup;
  currentCheckup: Checkup;
  onPress: (checkup: Checkup) => void;
}) => {
  return (
    <TouchableCardContainer onPress={() => onPress(currentCheckup)}>
      <CardCrown text={"CHECKUP"} featherIconName={"clipboard"} />

      {!nextCheckup && <UnfinishedCard currentCheckup={currentCheckup} />}
    </TouchableCardContainer>
  );
};

export default CheckUpCard;
