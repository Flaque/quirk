import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import theme from "./theme";

export const Row = ({ children, ...style }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      ...style,
    }}
  >
    {children}
  </View>
);

Row.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

export const GrayContainer = ({ children, ...style }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: theme.offwhite,
      padding: 25,
      borderRadius: 18,
      ...style,
    }}
  >
    {children}
  </View>
);

GrayContainer.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

export const FormContainer = ({ children }) => (
  <View
    style={{
      marginBottom: 24,
    }}
  >
    {children}
  </View>
);

FormContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export const Header = ({ children, ...style }) => (
  <Text
    style={{
      fontWeight: "900",
      fontSize: 48,
      color: theme.darkText,
      marginBottom: 12,
      ...style,
    }}
  >
    {children}
  </Text>
);

Header.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

export const SubHeader = ({ children, ...style }) => (
  <Text
    style={{
      fontWeight: "700",
      fontSize: 24,
      color: theme.darkText,
      marginBottom: 12,
      ...style,
    }}
  >
    {children}
  </Text>
);

SubHeader.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

export const SelectorTextItem = ({ text, selected = false, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={{
        fontWeight: "400",
        fontSize: 14,
        color: selected ? theme.darkText : theme.veryLightText,
        paddingBottom: 12,
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

SelectorTextItem.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export const RoundedSelector = ({ items, onPress, style }) => (
  <ScrollView
    style={{
      backgroundColor: "white",
      padding: 12,
      borderRadius: 12,
      borderColor: theme.veryLightText,
      borderWidth: 3,
      ...style,
    }}
  >
    {items.map(({ label, selected }) => (
      <SelectorTextItem
        key={label}
        text={label}
        selected={selected}
        onPress={() => onPress(label)}
      />
    ))}
  </ScrollView>
);

RoundedSelector.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export const Container = ({ children }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingTop: 75,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 50,
    }}
  >
    {children}
  </View>
);

Container.propTypes = {
  children: PropTypes.any,
};
