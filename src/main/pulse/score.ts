// import { fill } from "lodash";
import dayjs from "dayjs";
import clamp from "../../math/clamp";
import { PulseStamp } from "./types";

function isSameDay(timeOne: Date | string, timeTwo: Date | string) {
  return new Date(timeOne).toDateString() === new Date(timeTwo).toDateString();
}

export function isToday(time: Date | string) {
  return new Date(time).toDateString() === new Date().toDateString();
}

export function pushScore(history: PulseStamp[], score: number): PulseStamp[] {
  if (history.length === 0) {
    return [
      {
        date: new Date().toISOString(),
        score,
      },
    ];
  }

  // Add to the current day's pulse
  const lastStamp = history[history.length - 1];
  if (isToday(lastStamp.date)) {
    history[history.length - 1].score += score;
    return [...history];
  }

  // Add to the end
  return [
    ...history,
    {
      date: new Date().toISOString(),
      score,
    },
  ];
}

export const DAILY_LOSS = 5;

export function pad30DayHistory(history: PulseStamp[]): Array<number | "NONE"> {
  const hist = [
    ...history.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  ];

  // Pass 1
  const paddedHistory: Array<number | "NONE"> = [];
  for (let i = 0; i < 30; i++) {
    const date = dayjs().subtract(i, "day");

    const last = hist[hist.length - 1];
    if (last && isSameDay(last.date, date.toDate())) {
      paddedHistory.push(hist.pop().score);
      continue;
    }

    paddedHistory.push("NONE");
  }

  return paddedHistory.reverse();
}

// Given an incomplete history, calculates dropoff and returns the last 30 days of history
export function getCompleteHistory(history: PulseStamp[]): PulseStamp[] {
  if (history.length === 0) {
    return history;
  }

  // We do this in two passes.

  // First, we make a 30-length array and add "NONE" when nothing was recorded
  // ex: ["NONE", "NONE", 35, "NONE", 60, "NONE", ...]
  //
  const paddedHistory = pad30DayHistory(history);

  // Second, we walk the array and each time we find an item preceded
  // with "NONE" we substract by the DAILY_LOSS
  // ex: [0, 0, 35, 30, 60, 55, ...]
  const score = paddedHistory[0] === "NONE" ? 0 : (paddedHistory[0] as number);
  const completeHistory: PulseStamp[] = [
    {
      date: dayjs()
        .subtract(30, "day")
        .toISOString(),
      score,
    },
  ];

  for (let i = 1; i < paddedHistory.length; i++) {
    const date = dayjs()
      .subtract(30 - 1 - i, "day") // -1 to account for us starting at 1
      .toISOString();

    if (paddedHistory[i] === "NONE") {
      completeHistory.push({
        score: clamp(completeHistory[i - 1].score - DAILY_LOSS, 0, 100),
        date,
      });
      continue;
    }

    completeHistory.push({
      score: paddedHistory[i] as number,
      date,
    });
  }

  return completeHistory;
}
