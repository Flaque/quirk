import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  Animated,
} from "react-native";
import PropTypes from "prop-types";
import theme from "./theme";
import { Feather } from "@expo/vector-icons";
import distortions, { CognitiveDistortion } from "./distortions";
import { find } from "lodash";
import posed from "react-native-pose";

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

SelectorTextItem.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export const RoundedSelector = ({ items, onPress, style }) => (
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

export const ActionButton = ({
  title,
  onPress,
  fillColor,
  textColor,
  width,
  height,
  disabled,
}: {
  title: string;
  onPress: () => void;
  fillColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
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

export const WiggledComponent = posed()({
  wiggled: {
    rotate: "45deg",
  },
  stable: {
    rotate: "0deg",
  },
});

export class IconButton extends React.Component<
  {
    featherIconName: string;
    accessibilityLabel: string;
    onPress: () => void;
    style?: object;
    doesWiggle?: boolean;
  },
  {
    pose: "stable" | "wiggled";
    animationOver: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      pose: "stable",
      animationOver: false,
    };
  }

  componentDidMount() {
    if (this.state.animationOver) {
      return;
    }

    const delay = 1500;
    const duration = 100;

    if (this.props.doesWiggle) {
      setTimeout(() => {
        this.setWiggled();

        setTimeout(() => {
          this.setStable();
        }, duration);
      }, delay);
    }
  }

  setWiggled = () => {
    this.setState({ pose: "wiggled" });
  };

  setStable = () => {
    this.setState({ pose: "stable", animationOver: true });
  };

  render() {
    const { featherIconName, accessibilityLabel, onPress, style } = this.props;
    const { pose } = this.state;

    return (
      <WiggledComponent pose={pose}>
        {({ rotate }) => (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <TouchableOpacity
              style={{
                backgroundColor: theme.lightGray,
                height: 48,
                width: 48,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                alignSelf: "center",
                ...style,
              }}
              onPress={onPress}
              accessibilityLabel={accessibilityLabel}
            >
              <Feather
                name={featherIconName}
                size={24}
                color={theme.veryLightText}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </WiggledComponent>
    );
  }
}

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
