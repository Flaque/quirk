import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  RoundedSelectorButton,
  Row,
  ActionButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView } from "react-native";
import haptic from "../haptic";
import * as Haptic from "expo-haptics";
import { FAMILIARITY_SCREEN } from "./screens";
import { xor } from "lodash";
import { initSegment } from "../stats";

const Segment = initSegment();

const toggle = (array, item) => xor(array, [item]);

export default class FamiliarityScreen extends React.Component<
  ScreenProps,
  {
    slugs: string[];
  }
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    slugs: [],
  };

  onNext = async () => {
    haptic.impact(Haptic.ImpactFeedbackStyle.Light);

    Segment.trackWithProperties("user_recorded_condition", {
      slugs: this.state.slugs,
    });

    this.props.navigation.push(FAMILIARITY_SCREEN);
  };

  onSelect = async (slug: string) => {
    this.setState(prevState => {
      return {
        slugs: toggle(prevState.slugs, slug),
      };
    });
  };

  render() {
    return (
      <Container
        style={{
          paddingTop: 24 + Constants.statusBarHeight,
          backgroundColor: theme.lightOffwhite,
          flex: 1,
        }}
      >
        <ScrollView>
          <MediumHeader
            style={{
              marginBottom: 24,
            }}
          >
            Do you struggle with any of the following?
          </MediumHeader>

          <RoundedSelectorButton
            title={"Fear"}
            onPress={() => this.onSelect("fear")}
            selected={this.state.slugs.includes("fear")}
          />
          <RoundedSelectorButton
            title={"Sadness"}
            onPress={() => this.onSelect("sadness")}
            selected={this.state.slugs.includes("sadness")}
          />
          <RoundedSelectorButton
            title={"Anxiety"}
            onPress={() => this.onSelect("anxiety")}
            selected={this.state.slugs.includes("anxiety")}
          />
          <RoundedSelectorButton
            title={"Anger"}
            onPress={() => this.onSelect("anger")}
            selected={this.state.slugs.includes("anger")}
          />
          <RoundedSelectorButton
            title={"Depression"}
            onPress={() => this.onSelect("depression")}
            selected={this.state.slugs.includes("depression")}
          />
          <RoundedSelectorButton
            title={"Another Issue"}
            onPress={() => this.onSelect("other")}
            selected={this.state.slugs.includes("other")}
          />

          <Row
            style={{
              marginTop: 24,
            }}
          >
            <ActionButton
              title={"Next"}
              width="100%"
              onPress={() => this.onNext()}
            />
          </Row>
        </ScrollView>
      </Container>
    );
  }
}
