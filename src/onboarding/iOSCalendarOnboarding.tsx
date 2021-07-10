import React from "react";
import theme from "../theme";
import {
  Container,
  MediumHeader,
  HintHeader,
  SubHeader,
  Paragraph,
  Row,
  ActionButton,
  GhostButton,
} from "../ui";
import ScreenProps from "../ScreenProps";
import Constants from "expo-constants";
import { ScrollView, View, Platform } from "react-native";
import { MAIN_SCREEN, CHECKUP_SCREEN } from "../screens";
import {
  TouchableCardContainer,
  CardTitleAndSubtitleContent,
  CardCrown,
} from "../card/TouchableCard";
import * as Calendar from "expo-calendar";
import { uniqBy } from "lodash";

interface Cal {
  allowedAvailabilities: string[];
  allowsModifications: boolean;
  color: string;
  entityType: string;
  id: string;
  source: {
    id: string;
    name: string;
    type: string;
  };
  title: string;
  type: string;
}

export default class CheckupPromptScreen extends React.Component<
  ScreenProps,
  {
    slugs: string[];
  }
> {
  static navigationOptions = {
    header: null,
  };

  onContinue = () => {
    this.props.navigation.navigate(MAIN_SCREEN);
  };

  // Calendars have a number of different "sources" or places where
  // the actual cal data is stored. For example, gmail, icloud, outlook, etc.
  // Not all these sources will let us write to them, but these are the potential
  // options.
  _getPossibleSources = async () => {
    //@ts-ignore
    const calendars = (await Calendar.getCalendarsAsync()) as Cal[];
    return uniqBy(
      calendars.filter(c => c.type === "caldav").map(c => c.source),
      c => c.id
    );
  };

  // We'll attempt to write to the most likely writable sources and fall back to
  // other calendars if we fail. In the worst case scenario, we throw.
  _attemptToCreateCalendar = async (
    sources: Array<{
      id: string;
      name: string;
    }>
  ): Promise<string> => {
    // iCloud is probably the least likely to be a work account, and most likely
    // to be purely for personal use, so we'll prioritize attempting iCloud calendars.
    const iCloudAccounts = sources.filter(s => s.name === "iCloud");
    for (let src of iCloudAccounts) {
      try {
        return await Calendar.createCalendarAsync({
          title: "Quirk",
          entityType: Calendar.EntityTypes.EVENT,
          color: "#2196F3",
          sourceId: src.id,
          name: "Quirk",
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
          ownerAccount: "Quirk",
        });
      } catch (err) {
        continue;
      }
    }

    // iCloud didn't work so just cycle through them all until one works
    for (let src of sources) {
      try {
        return await Calendar.createCalendarAsync({
          title: "Quirk",
          entityType: Calendar.EntityTypes.EVENT,
          color: "#2196F3",
          sourceId: src.id,
          name: "Quirk",
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
          ownerAccount: "Quirk",
        });
      } catch (err) {
        continue;
      }
    }

    // Nothing work, panic
    throw new Error("No calendar works");
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
          <MediumHeader>
            We recommend checking in at least twice a week.
          </MediumHeader>
          <HintHeader
            style={{
              marginBottom: 12,
            }}
          >
            Quirk is best used in-the-moment, but it can be hard to build that
            habit at first.
          </HintHeader>

          <HintHeader
            style={{
              marginBottom: 24,
            }}
          >
            So instead, start by setting two weekly dates to review your
            thoughts. We recommend Wednesday and Sunday evenings.
          </HintHeader>

          <SubHeader>Let's add it to your calendar</SubHeader>

          <TouchableCardContainer
            onPress={async () => {
              //@ts-ignore
              const obj = (await Calendar.requestPermissionsAsync()) as {
                expires: string;
                granted: boolean;
                status: string;
              };

              if (!obj || obj.granted === false) {
                // Continue on
                console.log("AHHHH PERMISSION NOT GRANTED");
                return;
              }

              try {
                const sources = await this._getPossibleSources();
                await this._attemptToCreateCalendar(sources);
              } catch (err) {
                console.error(err);
              }

              Calendar.createEventAsync(undefined, {
                title: "Quirk",
                startDate: "",
              });
            }}
          >
            <CardCrown text="SETUP" featherIconName="calendar" />
            <CardTitleAndSubtitleContent
              title="Add a confidential event"
              subtitle="Create a Quirk-specific, private calendar with bi-weekly events."
            />
          </TouchableCardContainer>

          <GhostButton
            onPress={() => {
              //   this.props.navigation.navigate(CHECKUP_SCREEN);
            }}
            title="Skip this"
            width="100%"
            style={{}}
          />
        </ScrollView>
      </Container>
    );
  }
}
