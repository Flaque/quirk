import React from "react";
import { SubHeader, Paragraph, FloatingCard } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";

export default ({
  value,
  onChange,
  isOnboarding,
}: {
  value: string;
  onChange: (v: string) => void;
  isOnboarding?: boolean;
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
        {i18n.t("alt_thought")}
      </SubHeader>
      <Paragraph
        style={{
          marginBottom: 12,
        }}
      >
        This isn't a challenge, it's a way to cement an alternative thought.
      </Paragraph>
      <TextInput
        style={textInputStyle}
        placeholderTextColor={textInputPlaceholderColor}
        placeholder={i18n.t("cbt_form.alt_thought_placeholder")}
        value={value}
        multiline={true}
        numberOfLines={6}
        onChangeText={onChange}
      />
    </View>
    {isOnboarding && (
      <FloatingCard
        style={{
          position: "absolute",
          bottom: 48,
        }}
      >
        <SubHeader>How can we change the thought?💡</SubHeader>
        <Paragraph>
          An alternative thought helps cement where our thoughts could be in the
          future.
        </Paragraph>
      </FloatingCard>
    )}
  </>
);
