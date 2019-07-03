import React from "react";
import { SubHeader } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";
import * as stats from "../stats";

export default ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <>
    <View
      style={{
        display: "flex",
      }}
    >
      <SubHeader
        style={{
          marginBottom: 6,
        }}
      >
        {i18n.t("auto_thought")}
      </SubHeader>
      <TextInput
        style={textInputStyle}
        placeholderTextColor={textInputPlaceholderColor}
        placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
        value={value}
        multiline={true}
        numberOfLines={6}
        onChangeText={onChange}
        onBlur={() => stats.userFilledOutFormField("automatic")}
      />
    </View>
  </>
);
