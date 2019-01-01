import React from "react";
import { FormContainer, SubHeader, Paragraph } from "./ui";
import { Thought } from "./thoughts";

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
      <SubHeader>Automatic Thought</SubHeader>
      <Paragraph>{thought.automaticThought || "🤷‍"}</Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>Cognitive Distortion</SubHeader>
      <Paragraph>
        {cognitiveDistortionsToText(thought.cognitiveDistortions) || "🤷‍"}
      </Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>Challenge</SubHeader>
      <Paragraph>{thought.challenge || "🤷‍"}</Paragraph>
    </FormContainer>

    <FormContainer>
      <SubHeader>Alternative Thought</SubHeader>
      <Paragraph>{thought.alternativeThought || "🤷‍"}</Paragraph>
    </FormContainer>
  </>
);
