import React from "react";
import { SavedThought } from "../thoughts";
import { ScrollView } from "react-native";
import {
  SubHeader,
  Paragraph,
  FormContainer,
  GhostButtonWithGuts,
} from "../ui";
import i18n from "../i18n";
import { BubbleThought } from "../imgs/Bubbles";
import { emojiForSlug } from "../distortions";
import theme from "../theme";
import { Slides } from "./FormView";
import Feedback from "../feedback";

const cognitiveDistortionsToText = cognitiveDistortions => {
  const paragraphs = cognitiveDistortions
    .filter(distortion => distortion.selected) // Only take selected items
    .map(({ label, slug }) => (
      <Paragraph
        key={slug}
        style={{
          marginBottom: 8,
        }}
      >
        {emojiForSlug(slug)} {label}
      </Paragraph>
    ));

  if (!paragraphs || paragraphs.length === 0) {
    return <Paragraph>🤷‍</Paragraph>;
  }

  return paragraphs;
};

const CBTView = ({
  thought,
  onEdit,
}: {
  thought: SavedThought;
  onEdit: (uuid: string, slide: Slides) => void;
}) => (
  <>
    <FormContainer>
      <SubHeader>{i18n.t("auto_thought")}</SubHeader>

      <GhostButtonWithGuts
        borderColor={theme.lightGray}
        style={{
          backgroundColor: "white",
        }}
        onPress={() => onEdit(thought.uuid, "automatic")}
      >
        {thought.automaticThought ? (
          <BubbleThought
            style={{
              marginTop: 0,
            }}
          >
            {thought.automaticThought}
          </BubbleThought>
        ) : (
          <Paragraph>🤷‍</Paragraph>
        )}
      </GhostButtonWithGuts>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
      <GhostButtonWithGuts
        borderColor={theme.lightGray}
        style={{
          backgroundColor: "white",
        }}
        onPress={() => onEdit(thought.uuid, "distortions")}
      >
        {cognitiveDistortionsToText(thought.cognitiveDistortions)}
      </GhostButtonWithGuts>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("challenge")}</SubHeader>
      <GhostButtonWithGuts
        borderColor={theme.lightGray}
        style={{
          backgroundColor: "white",
        }}
        onPress={() => onEdit(thought.uuid, "challenge")}
      >
        <Paragraph>{thought.challenge || "🤷‍"}</Paragraph>
      </GhostButtonWithGuts>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("alt_thought")}</SubHeader>
      <GhostButtonWithGuts
        borderColor={theme.lightGray}
        style={{
          backgroundColor: "white",
        }}
        onPress={() => onEdit(thought.uuid, "alternative")}
      >
        {thought.alternativeThought ? (
          <BubbleThought
            style={{
              marginTop: 0,
            }}
            color="pink"
          >
            {thought.alternativeThought}
          </BubbleThought>
        ) : (
          <Paragraph>🤷‍</Paragraph>
        )}
      </GhostButtonWithGuts>
    </FormContainer>
  </>
);

export default ({
  thought,
  onEdit,
  onNew,
}: {
  thought: SavedThought;
  onEdit: (uuid: string, slide: Slides) => void;
  onNew: () => void;
}) => {
  if (!thought.uuid) {
    console.error("Viewing something that's not saved");
  }

  return (
    <ScrollView
      style={{
        paddingHorizontal: 24,
        paddingVertical: 18,
      }}
    >
      {/* <Row
        style={{
          marginBottom: 18,
        }}
      >
        <ActionButton title="New Thought" width={"100%"} onPress={onNew} />
      </Row> */}

      <CBTView thought={thought} onEdit={onEdit} />
      <Feedback />
    </ScrollView>
  );
};
