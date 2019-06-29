import React from "react";
import { SubHeader, Paragraph, Header, FloatingCard } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";
import theme from "../theme";

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
        value={
          isOnboarding
            ? "I texted George and he didn't respond back, what'd I do wrong?\n\nIt's been hours, he must have seen his phone right?"
            : value
        }
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
        <SubHeader>Let's try an example 💡</SubHeader>
        <Paragraph>
          We've filled out a thought already. --> Swipe to the right to see how
          it's distorted. -->
        </Paragraph>
      </FloatingCard>
    )}
  </>
);
