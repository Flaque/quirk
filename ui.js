import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import theme from "./theme";

export const Row = ({ children, ...rest }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      ...rest
    }}
  >
    {children}
  </View>
);

export const GrayContainer = ({ children, ...rest }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: theme.offwhite,
      padding: 25,
      borderRadius: 18,
      ...rest
    }}
  >
    {children}
  </View>
);

export const FormContainer = ({ children }) => (
  <View
    style={{
      marginBottom: 24
    }}
  >
    {children}
  </View>
);

export const Header = ({ children }) => (
  <Text
    style={{
      fontWeight: "900",
      fontSize: 48,
      color: theme.darkText,
      marginBottom: 12
    }}
  >
    {children}
  </Text>
);

export const SubHeader = ({ children }) => (
  <Text
    style={{
      fontWeight: "700",
      fontSize: 24,
      color: theme.darkText,
      marginBottom: 12
    }}
  >
    {children}
  </Text>
);

export const SelectorTextItem = ({ text, selected = false, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={{
        fontWeight: "400",
        fontSize: 14,
        color: selected ? theme.darkText : theme.veryLightText,
        paddingBottom: 12
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export const RoundedSelector = ({ options, onPress, style }) => (
  <ScrollView
    style={{
      backgroundColor: "white",
      padding: 12,
      borderRadius: 12,
      borderColor: theme.veryLightText,
      borderWidth: 3,
      ...style
    }}
  >
    {options.map(({ label, selected }) => (
      <SelectorTextItem
        key={label}
        text={label}
        selected={selected}
        onPress={() => onPress(label)}
      />
    ))}
  </ScrollView>
);
