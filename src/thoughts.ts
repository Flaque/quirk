import { CognitiveDistortion } from "./distortions";

export interface Thought {
  automaticThought: string;
  alternativeThought: string;
  cognitiveDistortions: CognitiveDistortion[];
  challenge: string;

  // Only if saved
  createdAt?: number;
  updatedAt?: number;
  uuid?: string;
}
