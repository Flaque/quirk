import React from "react";
import * as StoreReview from "react-native-store-review";
import { View, Linking, Platform } from "react-native";
import { SubHeader, Row, ActionButton } from "../ui";
import theme from "../theme";
import * as flagstore from "../flagstore";
import * as stats from "../stats";
import { countThoughts } from "../thoughtstore";

const PLAY_STORE_URL =
  "http://play.google.com/store/apps/details?id=tech.econn.quirk";

async function shouldShowRatingComponent() {
  // Don't show if we literally can't on this device
  if (Platform.OS === "ios" && !StoreReview.isAvailable) {
    console.log("review isn't available");
    return false;
  }

  if (
    Platform.OS === "android" &&
    !(await Linking.canOpenURL(PLAY_STORE_URL))
  ) {
    return false;
  }

  // Don't show if they've rated before
  const hasRatedBefore = await flagstore.get("has-rated", "false");
  if (hasRatedBefore) {
    console.log("has rated before isn't available");
    return false;
  }

  // Mainly show to power users
  const count = await countThoughts();
  if (count < 4) {
    return false;
  }

  return true;
}

export default class extends React.Component<
  {},
  {
    shouldShowRate: boolean;
    isReady: boolean;
  }
> {
  state = {
    isReady: false,
    shouldShowRate: false,
  };

  onRate = async () => {
    stats.userReviewed();

    if (Platform.OS === "ios") {
      StoreReview.requestReview();
    } else if (Platform.OS === "android") {
      await Linking.openURL(
        "http://play.google.com/store/apps/details?id=tech.econn.quirk"
      );
    }

    flagstore.setTrue("has-rated");
    this.setState({
      shouldShowRate: false,
    });
  };

  async componentDidMount() {
    const shouldShowRate = await shouldShowRatingComponent();

    this.setState({
      shouldShowRate,
      isReady: true,
    });
  }

  render() {
    const { isReady, shouldShowRate } = this.state;
    if (!isReady) {
      return null;
    }

    return (
      <View
        style={{
          marginTop: 18,
          borderRadius: 8,
          paddingBottom: 96,
        }}
      >
        <SubHeader
          style={{
            alignSelf: "flex-start",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          {this.state.shouldShowRate ? "Something Wrong?" : "Got Feedback?"}
        </SubHeader>
        <Row
          style={{
            alignSelf: "flex-start",
            justifyContent: "center",
          }}
        >
          <ActionButton
            fillColor={theme.lightGray}
            textColor={theme.blue}
            title={"Let us know"}
            width={"100%"}
            onPress={() => {
              Linking.openURL("mailto:humans@quirk.fyi");
            }}
          />
        </Row>

        {shouldShowRate && (
          <>
            <SubHeader
              style={{
                alignSelf: "flex-start",
                justifyContent: "center",
                marginTop: 18,
              }}
            >
              Love Quirk?
            </SubHeader>
            <Row
              style={{
                alignSelf: "flex-start",
                justifyContent: "center",
              }}
            >
              <ActionButton
                fillColor={theme.lightGray}
                textColor={theme.blue}
                title={"Give it a review 🙏"}
                width={"100%"}
                onPress={() => {
                  this.onRate();
                }}
              />
            </Row>
          </>
        )}
      </View>
    );
  }
}
