import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import theme from "./theme";
import { Feather } from "@expo/vector-icons";
import distortions, { CognitiveDistortion } from "./distortions";
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
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: selected ? theme.blue : "white",
      borderBottomColor: selected ? theme.darkBlue : "transparent",
      borderBottomWidth: 2,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 12,
      justifyContent: "space-between",
      flexDirection: "row",
    }}
  >
    <Text
      style={{
        fontWeight: "400",
        fontSize: 16,
        color: selected ? "white" : theme.veryLightText,
        paddingLeft: 12,
      }}
    >
      {text}
    </Text>

    {selected && <Feather name={"check"} size={16} color={"white"} />}
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
      borderRadius: 8,
      borderColor: theme.lightGray,
      borderWidth: 1,
      ...style,
    }}
  >
    {items.map(({ slug, selected }) => {
      const text = find(distortions, { slug });
      if (!text) {
        return null;
      }

      return (
        <SelectorTextItem
          key={slug}
          text={(text as CognitiveDistortion).label}
          selected={selected}
          onPress={() => onPress(slug)}
        />
      );
    })}
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

export const Container = ({ children, ...style }) => (
  <View
    style={{
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingTop: 75,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 50,
      ...style,
    }}
  >
    {children}
  </View>
);

Container.propTypes = {
  children: PropTypes.any,
};

export const Label = ({ children, ...style }) => (
  <Text
    style={{
      fontWeight: "700",
      fontSize: 18,
      color: theme.veryLightText,
      marginBottom: 12,
      ...style,
    }}
  >
    {children}
  </Text>
);
