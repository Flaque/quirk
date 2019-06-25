import React from "react";
import { SubHeader, Paragraph } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";

export default ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
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
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Include the situation and the thoughts.
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.auto_thought_placeholder")}
      value={value}
      multiline={true}
      numberOfLines={6}
      onChangeText={onChange}
    />
  </View>
);
