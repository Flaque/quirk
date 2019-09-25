import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://a9115f37287d4db39106d77e73aefa03@sentry.io/1443374",
  // @ts-ignore
  enableInExpoDevelopment: true,
  debug: true,
});

export default Sentry;
