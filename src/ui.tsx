import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import theme from "./theme";
import { Feather } from "@expo/vector-icons";
import distortions from "./distortions";
import { find } from "lodash";

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

export const FormContainer = ({ children, ...style }) => (
  <View
    style={{
      marginBottom: 24,
      ...style,
    }}
  >
    {children}
  </View>
);

FormContainer.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
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
      fontSize: 18,
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
        fontSize: 16,
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
      borderRadius: 8,
      borderColor: theme.lightGray,
      borderWidth: 1,
      ...style,
    }}
  >
    {items.map(({ slug, selected }) => (
      <SelectorTextItem
        key={slug}
        text={find(distortions, { slug }).label}
        selected={selected}
        onPress={() => onPress(slug)}
      />
    ))}
  </ScrollView>
);

RoundedSelector.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export const RoundedButton = ({
  title,
  onPress,
  fillColor,
  textColor,
  width,
  disabled,
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: fillColor,
      padding: 12,
      borderRadius: 8,
      textAlign: "center",
      width,
    }}
    disabled={disabled}
    onPress={onPress}
  >
    <Text
      style={{
        textAlign: "center",
        color: textColor,
        fontWeight: "700",
        fontSize: 16,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

RoundedButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  fillColor: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

RoundedButton.defaultProps = {
  fillColor: theme.blue,
  textColor: "white",
  width: 100,
};

export const IconButton = ({ featherIconName, onPress, ...style }) => (
  <TouchableOpacity
    style={{
      backgroundColor: theme.lightGray,
      height: 48,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "12",
      alignSelf: "center",
      ...style,
    }}
    onPress={onPress}
  >
    <Feather name={featherIconName} size={24} color={theme.veryLightText} />
  </TouchableOpacity>
);

IconButton.propTypes = {
  featherIconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
};

export const Paragraph = ({ children }) => (
  <Text
    style={{
      color: theme.lightText,
      fontWeight: "400",
      fontSize: 16,
    }}
  >
    {children}
  </Text>
);

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
};

export const Container = ({ children }) => (
  <View
    style={{
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
