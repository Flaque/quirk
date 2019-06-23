import React from "react";
import { FormContainer, SubHeader, Paragraph } from "./ui";
import { Thought } from "./thoughts";
import i18n from "./i18n";
import { BubbleThought } from "./imgs/Bubbles";
import { emojiForSlug } from "./distortions";

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

interface ThoughtComponent {
  thought: Thought;
}

export default ({ thought }: ThoughtComponent) => (
  <>
    <FormContainer>
      <SubHeader>{i18n.t("auto_thought")}</SubHeader>
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
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("cog_distortion")}</SubHeader>
      {cognitiveDistortionsToText(thought.cognitiveDistortions)}
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("challenge")}</SubHeader>
      <Paragraph>{thought.challenge || "🤷‍"}</Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t("alt_thought")}</SubHeader>
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
    </FormContainer>
  </>
);
