import {
  pad30DayHistory,
  getCompleteHistory,
  isToday,
  pushScore,
} from "./score";
import dayjs from "dayjs";
import { fill } from "lodash";

test("pad30DayHistory correctly pads history", () => {
  const history = pad30DayHistory([
    {
      date: dayjs()
        .subtract(1, "day")
        .toString(),
      score: 0,
    },
  ]);

  const expected = []
    .concat(fill(Array(28), "NONE"))
    .concat([0])
    .concat(["NONE"]);

  expect(history).toStrictEqual(expected);
});

test("pad30DayHistory with multiple days correctly pads history", () => {
  const history = pad30DayHistory([
    {
      date: dayjs()
        .subtract(1, "day")
        .toString(),
      score: 2,
    },

    {
      date: dayjs()
        .subtract(4, "day")
        .toString(),
      score: 20,
    },
  ]);

  const expected = []
    .concat(fill(Array(25), "NONE"))
    .concat([20])
    .concat(fill(Array(2), "NONE"))
    .concat([2])
    .concat(["NONE"]);

  expect(history).toStrictEqual(expected);
});

test("pushScore correctly adds something to the end of the history", () => {
  const history = getCompleteHistory([
    {
      date: dayjs()
        .subtract(1, "day")
        .toString(),
      score: 10,
    },

    {
      date: dayjs()
        .subtract(23, "day")
        .toString(),
      score: 40,
    },
  ]);

  const newHistory = pushScore(history, 30);
  expect(newHistory[newHistory.length - 1].score).toBe(35);
  expect(newHistory[newHistory.length - 3].score).toBe(0);
  expect(newHistory[newHistory.length - 24].score).toBe(40);
});

test("completeHistory correctly gives a history", () => {
  const history = getCompleteHistory([
    {
      date: dayjs()
        .subtract(1, "day")
        .toString(),
      score: 30,
    },

    {
      date: dayjs()
        .subtract(4, "day")
        .toString(),
      score: 70,
    },
  ]);

  // copy/pasted fixture
  const fixtureScores = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    70,
    65,
    60,
    30,
    25,
  ];

  expect(history.map(s => s.score)).toStrictEqual(fixtureScores); // scores should match
  expect(isToday(history[history.length - 1].date)).toBeTruthy(); // should be today
});
