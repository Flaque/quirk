interface PulseStamp {
  score: number;
  date: string;
}

function isToday(time: Date | string) {
  return new Date(time).toDateString() === new Date().toDateString();
}

function pushScore(history: PulseStamp[], score: number): PulseStamp[] {
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
    return [
      ...history,
      {
        date: lastStamp.date,
        score: lastStamp.score + score,
      },
    ];
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
