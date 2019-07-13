import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import theme from "./theme";
import { Feather } from "@expo/vector-icons";
import distortions, { CognitiveDistortion } from "./distortions";
import { find } from "lodash";

export interface ParentComponent {
  children: any;
  style?: object;
}

export interface Component {
  style?: object;
}

export const Row = ({ children, style }: { children: any; style?: any }) => (
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

export const Header = ({
  children,
  style,
  allowFontScaling,
}: ParentComponent & { allowFontScaling?: boolean }) => (
  <Text
    style={{
      fontWeight: "900",
      fontSize: 48,
      color: theme.darkText,
      marginBottom: 12,
      ...style,
    }}
    textBreakStrategy={"simple"}
    allowFontScaling={allowFontScaling}
  >
    {children}
  </Text>
);

Header.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};

export const SubHeader = ({ children, style }: ParentComponent) => (
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

export const SelectorTextItem = ({
  text,
  emoji,
  description,
  selected = false,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: selected ? theme.blue : "white",
      borderColor: selected ? theme.darkBlue : theme.lightGray,
      borderBottomWidth: 2,
      paddingTop: 8,
      paddingBottom: 4,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 4,
      marginTop: 1,
    }}
  >
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <Text
          style={{
            marginRight: 12,
            marginLeft: 12,
          }}
        >
          {emoji}
        </Text>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: selected ? "white" : theme.darkText,
              marginRight: 8,
            }}
          >
            {text}
          </Text>
          {selected && <Feather name={"check"} size={16} color={"white"} />}
        </View>
      </View>

      <View
        style={{
          marginRight: 12,
          marginLeft: 12,
          marginBottom: 6,
          backgroundColor: selected ? theme.darkBlue : theme.lightOffwhite,
          paddingLeft: 12,
          paddingRight: 12,
          paddingBottom: 6,
          paddingTop: 6,
          borderRadius: 8,
        }}
      >
        <Paragraph
          style={{
            fontWeight: "400",
            fontSize: 16,
            color: selected ? "white" : theme.darkText,
          }}
        >
          {description}
        </Paragraph>
      </View>
    </View>
  </TouchableOpacity>
);

SelectorTextItem.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export const RoundedSelector = ({
  items,
  onPress,
  style,
}: {
  onPress: (slug: string) => void;
} & any) => (
  <View
    style={{
      backgroundColor: theme.lightOffwhite,
      ...style,
    }}
  >
    {items.map(({ slug, selected }) => {
      const item = find(distortions, { slug });
      if (!item) {
        return null;
      }

      const cogDistortion = item as CognitiveDistortion;

      return (
        <SelectorTextItem
          key={slug}
          emoji={cogDistortion.emoji || "🍎"}
          text={cogDistortion.label}
          description={cogDistortion.description}
          selected={selected}
          onPress={() => onPress(slug)}
        />
      );
    })}
  </View>
);

RoundedSelector.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export const RoundedSelectorButton = ({
  title,
  selected = false,
  onPress,
}: {
  title: string;
  selected?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: selected ? theme.blue : "white",
      borderColor: selected ? theme.darkBlue : theme.lightGray,
      borderBottomWidth: 2,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 12,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 4,
      marginTop: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 16,
          color: selected ? "white" : theme.darkText,
          marginLeft: 12,
        }}
      >
        {title}
      </Text>
    </View>

    {selected && <Feather name={"check"} size={16} color={"white"} />}
  </TouchableOpacity>
);

export const FloatingCard = ({
  children,
  style,
}: {
  children: any;
  style?: any;
}) => (
  <View
    style={{
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: theme.blue,
      borderRadius: 8,
      padding: 24,
      elevation: 1,
      shadowColor: theme.lightGray,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 10,
      shadowOpacity: 0.8,
      width: "100%",
      ...style,
    }}
  >
    {children}
  </View>
);

export const GhostButtonWithGuts = ({
  onPress,
  borderColor,
  disabled,
  flex,
  children,
  style,
}: {
  onPress: () => void;
  borderColor: string;
  disabled?: boolean;
  flex?: number;
  children: any;
  style?: any;
}) => (
  <TouchableOpacity
    style={{
      padding: 12,
      borderRadius: 10,
      borderColor: borderColor,
      borderWidth: 1,
      borderBottomWidth: 2,
      flex,
      ...style,
    }}
    disabled={disabled}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export const GhostButton = ({
  title,
  onPress,
  borderColor,
  textColor,
  width,
  height,
  disabled,
  flex,
  fontSize,
  style,
}: {
  title: string;
  onPress: () => void;
  borderColor: string;
  textColor: string;
  width?: number | string;
  height?: number;
  disabled?: boolean;
  flex?: number;
  fontSize?: number;
  style?: any;
}) => (
  <TouchableOpacity
    style={{
      padding: 12,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: borderColor,
      borderWidth: 1,
      borderBottomWidth: 2,
      maxHeight: 48,
      width,
      height,
      flex,
      ...style,
    }}
    disabled={disabled}
    onPress={onPress}
  >
    <Text
      style={{
        textAlign: "center",
        color: textColor,
        fontWeight: "700",
        fontSize: fontSize || 16,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export const ActionButton = ({
  title,
  onPress,
  fillColor,
  textColor,
  width,
  height,
  disabled,
  flex,
}: {
  title: string;
  onPress: () => void;
  fillColor?: string;
  textColor?: string;
  width?: number | string;
  height?: number;
  disabled?: boolean;
  flex?: number;
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: fillColor,
      padding: 12,
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: 48,
      width,
      height,
      flex,
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

ActionButton.defaultProps = {
  fillColor: theme.blue,
  textColor: "white",
  width: 120,
};

export const IconButton = ({
  featherIconName,
  accessibilityLabel,
  onPress,
  style,
  hasBadge,
}: {
  featherIconName: string;
  accessibilityLabel: string;
  onPress: () => void;
  style?: object;
  hasBadge?: boolean;
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: theme.lightGray,
      height: 48,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      alignSelf: "center",
      position: "relative",
      ...style,
    }}
    accessibilityLabel={accessibilityLabel}
    onPress={onPress}
  >
    {hasBadge && (
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 24,
          backgroundColor: theme.pink,
          position: "absolute",
          bottom: 34,
          left: 34,
        }}
      />
    )}
    <Feather name={featherIconName} size={24} color={theme.veryLightText} />
  </TouchableOpacity>
);

IconButton.propTypes = {
  featherIconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
};

export const Paragraph = ({ children, style }: ParentComponent) => (
  <Text
    style={{
      color: theme.lightText,
      fontWeight: "400",
      fontSize: 16,
      ...style,
    }}
  >
    {children}
  </Text>
);

Paragraph.propTypes = {
  children: PropTypes.any.isRequired,
};

export const Container = ({ children, style }: ParentComponent) => (
  <View
    style={{
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingLeft: 24,
      paddingRight: 24,
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

export interface IllustrationComponent {
  style?: object;
  source: ImageSourcePropType;
}

export const Illustration = ({ style, source }: IllustrationComponent) => (
  <Image
    source={source}
    style={{ width: 200, height: 150, alignSelf: "center", ...style }}
  />
);

export const ThoughtDook = ({ style, source }: IllustrationComponent) => (
  <Image
    source={source}
    style={{ width: 48, height: 48, alignSelf: "center", ...style }}
  />
);

export const I = ({ children }) => (
  <Text style={{ fontStyle: "italic" }}>{children}</Text>
);

export const B = ({ children }) => (
  <Text style={{ fontWeight: "bold" }}>{children}</Text>
);
