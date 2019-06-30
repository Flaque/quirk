import React from "react";
import { SubHeader, Paragraph, FloatingCard, ActionButton } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";
import theme from "../theme";
import haptic from "../haptic";
import { Haptic } from "expo";

const CHALLENGE = `George might be busy. I can't expect to have immediate access to his time.`;

export default class extends React.Component<
  {
    value: string;
    onChange: (v: string) => void;
    isOnboarding?: boolean;
  },
  {
    showExample: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      showExample: false,
    };
  }

  render() {
    const { value, onChange, isOnboarding } = this.props;

    return (
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
            {i18n.t("challenge")}
          </SubHeader>
          <Paragraph
            style={{
              marginBottom: 12,
            }}
          >
            Be truthful, honest, and open.
          </Paragraph>
          <TextInput
            style={{
              ...textInputStyle,
              backgroundColor: this.state.showExample
                ? theme.lightGray
                : "white",
            }}
            placeholderTextColor={textInputPlaceholderColor}
            placeholder={i18n.t("cbt_form.changed_placeholder")}
            value={this.state.showExample ? CHALLENGE : value}
            multiline={true}
            numberOfLines={6}
            onChangeText={onChange}
            editable={!this.state.showExample}
          />
        </View>
        {isOnboarding && (
          <FloatingCard
            style={{
              position: "absolute",
              bottom: 48,
            }}
          >
            <SubHeader>Now it's your turn 💡</SubHeader>
            <Paragraph
              style={{
                marginBottom: 24,
              }}
            >
              In your own words, what's logically wrong with this thought?
            </Paragraph>

            <ActionButton
              title={this.state.showExample ? "Hide Example" : "Show Example"}
              width={"100%"}
              fillColor="#EDF0FC"
              textColor={theme.darkBlue}
              onPress={() => {
                haptic.impact(Haptic.ImpactFeedbackStyle.Light);
                this.setState({
                  showExample: !this.state.showExample,
                });
              }}
            />
          </FloatingCard>
        )}
      </>
    );
  }
}
