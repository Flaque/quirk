import React from "react";
import { SubHeader } from "../ui";
import { View, TextInput } from "react-native";
import i18n from "../i18n";
import { textInputStyle, textInputPlaceholderColor } from "./textInputStyle";
import theme from "../theme";
import * as stats from "../stats";

const CHALLENGE = `George might be busy. I can't expect to have immediate access to his time.`;

export default class extends React.Component<
  {
    value: string;
    onChange: (v: string) => void;
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
    const { value, onChange } = this.props;

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
            onBlur={() => stats.userFilledOutFormField("challenge")}
          />
        </View>
      </>
    );
  }
}
