import React from "react";
import { SubHeader, Paragraph } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";

export default ({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
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
      {i18n.t("challenge")}
    </SubHeader>
    <Paragraph
      style={{
        marginBottom: 12,
      }}
    >
      Be truthful, honest, and open.
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
      onSubmitEditing={onNext}
    />
  </View>
);
