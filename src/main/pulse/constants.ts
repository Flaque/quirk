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

export const FIVE_THOUGHTS: Boost = {
  score: 8,
  label: "Five Thoughts",
};

export const TEN_THOUGHTS: Boost = {
  score: 9,
  label: "Ten Thoughts",
};

export const TWENTY_THOUGHTS: Boost = {
  score: 8,
  label: "Twenty Thoughts",
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

// Checkups
export const COMPLETE_CHECKUP: Boost = {
  score: 3,
  label: "Completed Checkup",
};
