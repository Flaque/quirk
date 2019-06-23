import React from "react";
import { SavedThought, Thought } from "../thoughts";
import { View } from "react-native";
import {
  Row,
  ActionButton,
  SubHeader,
  Paragraph,
  FormContainer,
  GhostButtonWithGuts,
} from "../ui";
import i18n from "../i18n";
import { BubbleThought } from "../imgs/Bubbles";
import { emojiForSlug } from "../distortions";
import theme from "../theme";

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

const CBTView = ({ thought }: ThoughtComponent) => (
  <>
    <FormContainer>
      <SubHeader>{i18n.t("auto_thought")}</SubHeader>

      <GhostButtonWithGuts
        borderColor={theme.lightGray}
        style={{
          backgroundColor: "white",
        }}
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
  onEdit: (uuid: string) => void;
  onNew: () => void;
}) => {
  if (!thought.uuid) {
    console.error("Viewing something that's not saved");
  }

  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 18,
      }}
    >
      <CBTView thought={thought} />

      <Row>
        {/* <ActionButton
          fillColor="transparent"
          textColor={theme.blue}
          title={i18n.t("cbt_form.edit")}
          onPress={() => onEdit(thought.uuid)}
          disabled={false}
        /> */}
        <ActionButton
          title={i18n.t("cbt_form.new")}
          onPress={onNew}
          disabled={false}
          width={"100%"}
        />
      </Row>
      {/* 
      <View
        style={{
          marginTop: 24,
          borderRadius: 8,
        }}
      >
        <SubHeader
          style={{
            alignSelf: "flex-start",
            justifyContent: "center",
          }}
        >
          Got Feedback?
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
            title={"Email Us!"}
            onPress={() => {
              Linking.openURL("mailto:humans@quirk.fyi");
            }}
          />
        </Row>
      </View> */}
    </View>
  );
};
