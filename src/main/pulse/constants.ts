export interface Boost {
  score: number;
  label: string;
}

// How much your score degrades every day
export const DAILY_LOSS = 1;

// Thoughts
export const START_THOUGHT: Boost = {
  score: 6,
  label: "Thought Recorded",
};

export const SCHEDULED_FOLLOW_UP: Boost = {
  score: 1,
  label: "Scheduled Follow-up",
};

export const FINISHED_FOLLOW_UP: Boost = {
  score: 4,
  label: "Finished Follow-up",
};

export const FELT_BETTER: Boost = {
  score: 1,
  label: "Felt better",
};

// Predictions
export const START_PREDICTION: Boost = {
  score: 3,
  label: "Prediction Started",
};
export const FINISH_PREDICTION: Boost = {
  score: 4,
  label: "Finished Prediction",
};
