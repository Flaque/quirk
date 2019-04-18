import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from "react-native";
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

export const Row = ({ children, style }: ParentComponent) => (
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

export const FormContainer = ({ children, ...style }: ParentComponent) => (
  <View
    style={{
      marginBottom: 24,
      ...style,
    }}
  >
    {children}
  </View>
);

export const Header = ({ children, style }: ParentComponent) => (
  <Text
    style={{
      fontWeight: "900",
      fontSize: 48,
      color: theme.darkText,
      marginBottom: 12,
      ...style,
    }}
    textBreakStrategy={"simple"}
  >
    {children}
  </Text>
);

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
  selected = false,
  onPress
}: {text: string; emoji: any; selected?: boolean; onPress: () => void}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: selected ? theme.blue : "white",
      borderColor: selected ? theme.darkBlue : theme.lightGray,
      borderBottomWidth: 2,
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 4,
      marginTop: 1,
    }}
  >
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          marginRight: 12,
          marginLeft: 12,
        }}
      >
        {emoji}
      </Text>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 16,
          color: selected ? "white" : theme.darkText,
        }}
      >
        {text}
      </Text>
    </View>

    {selected && <Feather name={"check"} size={16} color={"white"} />}
  </TouchableOpacity>
);

export const RoundedSelector = ({ items, onPress, style }: {items: CognitiveDistortion[]; onPress: (arg: string) => void; style?: object}) => (
  <View
    style={{
      backgroundColor: theme.lightOffwhite,
      ...style,
    }}
  >
    {items.map(({ slug, selected }) => {
      const cogDistortion = find(distortions, { slug });
      if (!cogDistortion) {
        return null;
      }

      return (
        <SelectorTextItem
          key={slug}
          emoji={cogDistortion.emoji || "🍎"}
          text={cogDistortion.label}
          selected={selected}
          onPress={() => onPress(slug)}
        />
      );
    })}
  </View>
);

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

export const RoundedButton = ({
  title,
  onPress,
  fillColor,
  textColor,
  width,
  disabled,
}: {
  title: string;
  onPress: () => void;
  fillColor?: string;
  textColor?: string;
  width?: number;
  disabled?: boolean;
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

export const IconButton = ({
  featherIconName,
  onPress,
  style,
}: {
  featherIconName: string;
  onPress: () => void;
  style?: object;
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: theme.lightGray,
      height: 48,
      width: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      alignSelf: "center",
      ...style,
    }}
    onPress={onPress}
  >
    <Feather name={featherIconName} size={24} color={theme.veryLightText} />
  </TouchableOpacity>
);

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

export const Label = ({ children, ...style }: ParentComponent) => (
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

export const I = ({ children, style }: ParentComponent) => (
  <Text style={{ fontStyle: "italic", ...style }}>{children}</Text>
);

export const B = ({ children, style }: ParentComponent) => (
  <Text style={{ fontWeight: "bold", ...style }}>{children}</Text>
);
