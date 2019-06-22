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
      {i18n.t("alt_thought")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      What could we think instead?
    </Paragraph>
    <TextInput
      style={textInputStyle}
      placeholderTextColor={textInputPlaceholderColor}
      placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
      value={value}
      returnKeyType="next"
      multiline={true}
      numberOfLines={6}
      blurOnSubmit={true}
      onChangeText={onChange}
    />
  </View>
);
