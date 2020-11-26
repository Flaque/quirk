const NUM_RETRIES = 3;

export default async (url: string, options: RequestInit) => {
  console.log("ATTEMPTING REQUEST");
  const n = NUM_RETRIES;
  for (let i = 0; i < n; i++) {
    try {
      console.log("REQUESTING");
      return await fetch(url, options);
    } catch (err) {
      console.log("ERRORING");
      const isLastAttempt = i + 1 === n;
      if (isLastAttempt) {
        throw err;
      }
    }
  }
  throw Error(`Attempted request ${n} times, but failed`);
};
