import React from "react";
import { FormContainer, SubHeader, Paragraph } from "./ui";
import { Thought } from "./thoughts";
import i18n from './i18n';

const cognitiveDistortionsToText = cognitiveDistortions => {
  const text = cognitiveDistortions
    .filter(distortion => distortion.selected) // Only take selected items
    .map(({ label }) => `• ${label}`) // format as "• All or Nothing Thinking"
    .join("\n")
    .trim(); // Remove excess whitespace
  return text;
};

interface ThoughtComponent {
  thought: Thought;
}

export default ({ thought }: ThoughtComponent) => (
  <>
    <FormContainer>
      <SubHeader>{i18n.t('auto_thought')}</SubHeader>
      <Paragraph>{thought.automaticThought || "🤷‍"}</Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t('cog_distortion')}</SubHeader>
      <Paragraph>
        {cognitiveDistortionsToText(thought.cognitiveDistortions) || "🤷‍"}
      </Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t('challenge')}</SubHeader>
      <Paragraph>{thought.challenge || "🤷‍"}</Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>{i18n.t('alt_thought')}</SubHeader>
      <Paragraph>{thought.alternativeThought || "🤷‍"}</Paragraph>
    </FormContainer>
  </>
);
