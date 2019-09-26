import { pad30DayHistory, getCompleteHistory, isToday } from "./score";
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
    .concat(["NONE"])
    .concat([0])
    .concat(fill(Array(28), "NONE"));

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
    .concat(["NONE"])
    .concat([2])
    .concat(fill(Array(2), "NONE"))
    .concat([20])
    .concat(fill(Array(25), "NONE"));

  expect(history).toStrictEqual(expected);
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
    { score: 0 },
    { score: 30 },
    { score: 25 },
    { score: 20 },
    { score: 70 },
    { score: 65 },
    { score: 60 },
    { score: 55 },
    { score: 50 },
    { score: 45 },
    { score: 40 },
    { score: 35 },
    { score: 30 },
    { score: 25 },
    { score: 20 },
    { score: 15 },
    { score: 10 },
    { score: 5 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
    { score: 0 },
  ].map(f => f.score);

  expect(history.map(s => s.score)).toStrictEqual(fixtureScores); // scores should match
  expect(isToday(history[history.length - 1].date)).toBeTruthy(); // should be today
});
