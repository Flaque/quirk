import React from "react";
import theme from "../theme";
import { newFadesIn } from "../animations";
import shadowStyle from "../shadowStyle";
import { Feather } from "@expo/vector-icons";

const OpacityFlasher = newFadesIn({ maxOpacity: 0.8 });

export default ({ pose }) => (
  <OpacityFlasher
    pose={pose}
    style={{
      width: 35,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.blue,
      borderColor: theme.darkBlue,
      borderWidth: 1,
      borderBottomWidth: 2,
      borderRadius: 30,
      marginBottom: 20,
      marginRight: 20,
      ...shadowStyle,
    }}
  >
    <Feather name="arrow-right" size={16} color={"white"} />
  </OpacityFlasher>
);
