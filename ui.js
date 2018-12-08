import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

export const Row = ({ children, ...rest }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
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
      backgroundColor: "#F9F9F9",
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
      color: "#353B48",
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
      color: "#353B48",
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
        color: selected ? "#353B48" : "#D8D8D8",
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
